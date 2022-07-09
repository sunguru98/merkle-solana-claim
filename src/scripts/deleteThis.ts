import { IDL } from '../doge-o-idl';
import * as anchor from '@project-serum/anchor';
import constants from '../constants';

import dogeDevMintList from '../json/doge-dev-dog-list.json';
import { PublicKey, Transaction } from '@solana/web3.js';

(async function () {
  try {
    const SLOT_LENGTH = 10;
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

    console.log('Fee Payer:', FEE_PAYER_KEYPAIR.publicKey.toString());

    const slots = Array.from(
      { length: dogeDevMintList.length / SLOT_LENGTH },
      (_, i) => i
    );

    for (const slot of slots) {
      let isDone = false;

      const instructions = await Promise.all(
        Array.from({ length: SLOT_LENGTH }).map(async (_, index) => {
          const dogeIndex = SLOT_LENGTH * slot + index;
          const doge = dogeDevMintList[dogeIndex];
          const dogeMint = new anchor.web3.PublicKey(doge);
          const [dogeStats] = await PublicKey.findProgramAddress(
            [
              Buffer.from('dogeo'),
              FEE_PAYER_KEYPAIR.publicKey.toBytes(),
              dogeMint.toBytes(),
            ],
            dogeOProgramId
          );
          return dogeOProgram.methods
            .increaseStorage()
            .accounts({
              initAuthority: FEE_PAYER_KEYPAIR.publicKey,
              dogeStats,
              dogeMint,
            })
            .instruction();
        })
      );

      while (!isDone) {
        try {
          const transaction = new Transaction({
            feePayer: FEE_PAYER_KEYPAIR.publicKey,
          }).add(...instructions);

          const txHash = await CONNECTION.sendTransaction(transaction, [
            FEE_PAYER_KEYPAIR,
          ]);
          await CONNECTION.confirmTransaction(txHash, 'singleGossip');
          isDone = true;

          console.log('Increase storage done for slot:', slot);
        } catch (err) {
          console.log(err);
          console.log(`Retrying increase storage`);
          continue;
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  }
})();
