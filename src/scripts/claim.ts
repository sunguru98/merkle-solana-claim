import { Program, Provider } from '@project-serum/anchor';
import {
  BalanceTree,
  toBytes32Array,
} from '@saberhq/merkle-distributor/dist/cjs/utils';
import {
  SolanaProvider,
  SingleConnectionBroadcaster,
  SignerWallet,
} from '@saberhq/solana-contrib';
import { getOrCreateATA, TOKEN_PROGRAM_ID, u64 } from '@saberhq/token-utils';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import constants from '../constants';

import wlHash from '../json/wlHash.json';
import distributorData from '../json/distributor.json';
import { findClaimStatusKey } from '../utils';

import { IDL as MerkleDistributorJSON } from '../idl';

(async function () {
  try {
    const {
      CLAIMER_KEYPAIR,
      CONNECTION,
      TOKEN_MINT,
      TOKEN_DECIMALS,
      PROGRAM_ID,
    } = constants;

    const provider = new SolanaProvider(
      CONNECTION,
      new SingleConnectionBroadcaster(CONNECTION),
      new SignerWallet(CLAIMER_KEYPAIR)
    );

    const { instruction } = new Program(
      MerkleDistributorJSON,
      PROGRAM_ID,
      new Provider(provider.connection, provider.wallet, provider.opts)
    );

    const claimer = (wlHash as any)[provider.wallet.publicKey.toString()];

    if (!claimer) throw new Error('Invalid claimer');

    const tree = new BalanceTree(
      Object.entries(wlHash).map(([account, { amount }]) => {
        return {
          account: new PublicKey(account),
          amount: new u64(amount),
        };
      })
    );

    const proof = tree.getProof(
      claimer.index,
      provider.wallet.publicKey,
      claimer.amount
    );

    const distributor = new PublicKey(distributorData.distributor);
    console.log('Distributor', distributor.toString());
    const distributorATA = new PublicKey(distributorData.distribtuorATA);

    const { address, instruction: createATAIx } = await getOrCreateATA({
      provider,
      mint: TOKEN_MINT,
      owner: provider.wallet.publicKey,
      payer: provider.wallet.publicKey,
    });

    const [claimStatus, bump] = await findClaimStatusKey(
      new u64(claimer.index),
      distributor
    );

    const claimIx = instruction.claim(
      bump,
      new u64(claimer.index),
      new u64(claimer.amount * 10 ** TOKEN_DECIMALS),
      proof.map((p) => toBytes32Array(p)),
      {
        accounts: {
          distributor,
          claimStatus,
          from: distributorATA,
          to: address,
          claimant: provider.wallet.publicKey,
          payer: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      }
    );

    const transaction = new Transaction({
      recentBlockhash: (await provider.connection.getLatestBlockhash())
        .blockhash,
      feePayer: provider.wallet.publicKey,
    });

    createATAIx && transaction.add(createATAIx);
    transaction.add(claimIx);

    const signedTx = await provider.wallet.signTransaction(transaction);

    const txHash = await provider.connection.sendRawTransaction(
      signedTx.serialize()
    );

    await provider.connection.confirmTransaction(txHash);

    console.log(
      `Claim successful. Tx hash ${txHash} Account balance ${claimer.amount}`
    );
  } catch (err) {
    console.error(err as Error);
  }
})();
