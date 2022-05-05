import { getOrCreateATA, u64 } from '@saberhq/token-utils';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

import { writeJSON } from 'fs-extra';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Program, Provider } from '@project-serum/anchor';
import {
  SolanaProvider,
  SingleConnectionBroadcaster,
  SignerWallet,
} from '@saberhq/solana-contrib';
import { parseBalanceMap, findDistributorKey } from '../utils';
import { toBytes32Array } from '@saberhq/merkle-distributor/dist/cjs/utils';
import constants from '../constants';

import { IDL as MerkleDistributorJSON } from '../idl';

const main = async () => {
  const {
    TOKEN_MINT,
    SOURCE_TOKEN_ACCOUNT,
    TOKEN_DECIMALS,
    AIRDROP_DATA,
    CONNECTION,
    FEE_PAYER_KEYPAIR,
    PROGRAM_ID,
  } = constants;

  const provider = new SolanaProvider(
    CONNECTION,
    new SingleConnectionBroadcaster(CONNECTION),
    new SignerWallet(FEE_PAYER_KEYPAIR)
  );

  console.log(`Fee payer`, provider.wallet.publicKey.toString());

  const balanceMap = AIRDROP_DATA.reduce(
    (acc: Record<string, u64>, { account, amount }) => {
      acc[account] = (acc[account] || new u64(0)).add(new u64(amount));
      return acc;
    },
    {}
  );

  const { claims, merkleRoot, tokenTotal } = parseBalanceMap(
    Object.entries(balanceMap).map(([account, amount]) => ({
      address: account,
      earnings: amount.toString(),
    }))
  );

  console.log(`Total WL to send ${tokenTotal}`);

  const newWlData = Object.entries(claims).reduce(
    (
      acc: Record<string, { amount: number; index: number }>,
      [key, { index, amount }]
    ) => {
      acc[key] = {
        index,
        amount: amount.toNumber(),
      };

      return acc;
    },
    {}
  );

  const { instruction } = new Program(
    MerkleDistributorJSON,
    PROGRAM_ID,
    new Provider(provider.connection, provider.wallet, provider.opts)
  );

  const baseKeypair = Keypair.generate();

  const [distributor, bump] = await findDistributorKey(
    provider.wallet.publicKey,
    baseKeypair.publicKey
  );

  console.log(`Distributor: ${distributor.toString()}`);
  const { address, instruction: createATAIx } = await getOrCreateATA({
    // @ts-ignore
    provider,
    mint: TOKEN_MINT,
    owner: distributor,
  });

  const tx = new Transaction();

  tx.add(
    instruction.newDistributor(
      bump,
      toBytes32Array(merkleRoot),
      new u64(tokenTotal),
      new u64(Object.keys(claims).length),
      {
        accounts: {
          authority: provider.wallet.publicKey,
          base: baseKeypair.publicKey,
          distributor,
          mint: TOKEN_MINT,
          payer: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
      }
    )
  );

  createATAIx && tx.add(createATAIx);
  tx.add(
    Token.createTransferCheckedInstruction(
      TOKEN_PROGRAM_ID,
      SOURCE_TOKEN_ACCOUNT,
      new PublicKey(TOKEN_MINT),
      address,
      provider.wallet.publicKey,
      [],
      parseInt(tokenTotal) * 10 ** TOKEN_DECIMALS,
      TOKEN_DECIMALS
    )
  );

  tx.recentBlockhash = (
    await provider.connection.getLatestBlockhash()
  ).blockhash;
  tx.feePayer = provider.wallet.publicKey;

  const signedTx = await provider.wallet.signTransaction(tx);
  signedTx.partialSign(baseKeypair);
  const txHash = await provider.connection.sendRawTransaction(
    signedTx.serialize()
  );
  await provider.connection.confirmTransaction(txHash);

  console.log(
    'Created Distributor acccount',
    `https://explorer.solana.com/tx/${txHash}`
  );

  console.log(
    JSON.stringify(
      {
        bump: bump,
        distributor: distributor.toString(),
        distribtuorATA: address.toString(),
      },
      null,
      2
    )
  );

  await writeJSON(`${__dirname}/../json/wlHash.json`, newWlData, { spaces: 2 });
  await writeJSON(
    `${__dirname}/../json/distributor.json`,
    {
      bump: bump,
      distributor: distributor.toString(),
      distribtuorATA: address.toString(),
    },
    {
      spaces: 2,
    }
  );
};

main()
  .then()
  .catch((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
