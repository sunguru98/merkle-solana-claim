import { Program, Provider } from '@project-serum/anchor';
import {
  SolanaProvider,
  SingleConnectionBroadcaster,
  SignerWallet,
  PublicKey,
} from '@saberhq/solana-contrib';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Keypair, SystemProgram } from '@solana/web3.js';
import constants from '../constants';
import { IDL as MerkleDistributorJSON } from '../idl';

import distributorData from '../json/distributor.json';

(async function () {
  try {
    const { CONNECTION, FEE_PAYER_KEYPAIR, SOURCE_TOKEN_ACCOUNT, PROGRAM_ID } =
      constants;

    const provider = new SolanaProvider(
      CONNECTION,
      new SingleConnectionBroadcaster(CONNECTION),
      new SignerWallet(FEE_PAYER_KEYPAIR)
    );

    const { rpc } = new Program(
      MerkleDistributorJSON,
      PROGRAM_ID,
      new Provider(provider.connection, provider.wallet, provider.opts)
    );

    const distributor = new PublicKey(distributorData.distributor);
    const distributorATA = new PublicKey(distributorData.distribtuorATA);

    const res = await rpc.surrenderTokens({
      accounts: {
        authority: FEE_PAYER_KEYPAIR.publicKey,
        distributor,
        from: distributorATA,
        to: SOURCE_TOKEN_ACCOUNT,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });

    console.log(`Surrender succesful. Tx hash ${res}`);
  } catch (err) {
    console.error(err.message);
  }
})();
