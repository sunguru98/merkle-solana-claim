import { IDL } from '../doge-o-idl';
import * as anchor from '@project-serum/anchor';
import constants from '../constants';

import dogeDevMintList from '../json/doge-dev-dog-list.json';
import { PublicKey, Transaction } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

(async function () {
  try {
    const SLOT_LENGTH = 8;
    const { CONNECTION, FEE_PAYER_KEYPAIR, NEW_FEE_PAYER_KEYPAIR } = constants;
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
      { length: Math.ceil(dogeDevMintList.length / SLOT_LENGTH) },
      (_, i) => i
    );

    for (const slot of slots) {
      let isDone = false;

      const instructions = (
        await Promise.all(
          Array.from({ length: SLOT_LENGTH }).map(async (_, index) => {
            const dogeIndex = SLOT_LENGTH * slot + index;
            const doge = dogeDevMintList[dogeIndex];
            const dogeMint = new anchor.web3.PublicKey(doge);
            const dogeMetadata = await Metadata.getPDA(dogeMint);

            const [dogeStats] = await PublicKey.findProgramAddress(
              [
                Buffer.from('dogeo'),
                new PublicKey(
                  '3zKbAa4UEsHKx2Q6XQTZcmgv8NxmZtmns26AxZbcVGGc'
                ).toBytes(),
                dogeMint.toBytes(),
              ],
              dogeOProgramId
            );

            const setAddressesIx = await dogeOProgram.methods
              .setAddresses()
              .accounts({
                initAuthority: FEE_PAYER_KEYPAIR.publicKey,
                dogeStats,
                dogeMint,
                dogeMetadata,
              })
              .instruction();

            // const recreateIx = await dogeOProgram.methods
            //   .initStats({ agility, endurance, speed })
            //   .accounts({
            //     dogeMetadata,
            //     dogeStats: (
            //       await PublicKey.findProgramAddress(
            //         [
            //           Buffer.from('dogeo'),
            //           new PublicKey(
            //             '4DRR9ZY5vBZboaKmLFpuUsmFLCHcmZHkpDZaobyPnB5f'
            //           ).toBytes(),
            //           dogeMint.toBytes(),
            //         ],
            //         dogeOProgramId
            //       )
            //     )[0],
            //     dogeMint,
            //     initAuthority: NEW_FEE_PAYER_KEYPAIR.publicKey,
            //     systemProgram: SystemProgram.programId,
            //   })
            //   .instruction();

            // return [closeAccIx, recreateIx];
            return setAddressesIx;
          })
        )
      ).flat();

      while (!isDone) {
        try {
          const recentBlockhash = await CONNECTION.getLatestBlockhash();
          const transaction = new Transaction({
            feePayer: NEW_FEE_PAYER_KEYPAIR.publicKey,
            ...recentBlockhash,
          }).add(...instructions);

          const txHash = await CONNECTION.sendTransaction(transaction, [
            FEE_PAYER_KEYPAIR,
            NEW_FEE_PAYER_KEYPAIR,
          ]);

          await CONNECTION.confirmTransaction(
            { signature: txHash, ...recentBlockhash },
            'confirmed'
          );

          console.log('Address set for slot:', slot);
          isDone = true;
        } catch (err) {
          console.log(err);
          console.log(`Retrying setaddresses for slot ${slot}`);
          continue;
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  }
})();
