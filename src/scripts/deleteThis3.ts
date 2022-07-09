import { TokenAccountLayout } from '@saberhq/token-utils';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

import constants from '../constants';
import * as anchor from '@project-serum/anchor';
import { IDL } from '../doge-o-idl';

(async function () {
  try {
    const { CONNECTION, FEE_PAYER_KEYPAIR } = constants;
    const anchorProvider = new anchor.Provider(
      CONNECTION,
      new anchor.Wallet(FEE_PAYER_KEYPAIR),
      { commitment: 'singleGossip' }
    );

    const dogeOProgramId = new anchor.web3.PublicKey(
      '2FJPtjHmYZBAeFLudMHFgQAq5vsEMW6uXhc8TqtVZvMS'
    );

    const dogeOProgram = new anchor.Program(
      IDL,
      dogeOProgramId,
      anchorProvider
    );

    const data = await dogeOProgram.account.dogeStats.fetch(
      new PublicKey('AC82M7hbwXP2eyFJkLefFh6ieAng2qEku5aYESxC6bp6')
    );

    console.log(data);
  } catch (err) {
    console.error(err);
  }
})();
