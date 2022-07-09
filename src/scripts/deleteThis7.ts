import {
  Metadata,
  UpdateMetadataV2,
} from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey, Transaction } from '@solana/web3.js';
import dogeTrackList from '../json/doge-dev-track-list.json';

import constants from '../constants';

(async function () {
  try {
    const TOTAL_SLOTS = 10;

    const totalTrackTxs = Array.from(
      {
        length: Math.ceil(dogeTrackList.length / TOTAL_SLOTS),
      },
      (_, i) => i
    );

    console.log(`Updating Tracks' Authority`);
    await updateMetadata(totalTrackTxs, dogeTrackList);
  } catch (err) {
    console.error(err);
  }
})();

async function updateMetadata(txs: number[], list: string[]) {
  const { CONNECTION, NEW_FEE_PAYER_KEYPAIR } = constants;

  for (const slot of txs) {
    let isDone = false;
    console.log(`Updating for slot ${slot}`);
    const dogeUpdateIxs = (
      await Promise.all(
        list.slice(slot * 10, slot * 10 + 10).map(async (address) => {
          const metadata = await Metadata.getPDA(new PublicKey(address));
          return new UpdateMetadataV2(
            {
              feePayer: NEW_FEE_PAYER_KEYPAIR.publicKey,
            },
            {
              metadata,
              updateAuthority: NEW_FEE_PAYER_KEYPAIR.publicKey,
              newUpdateAuthority: new PublicKey(
                '3zKbAa4UEsHKx2Q6XQTZcmgv8NxmZtmns26AxZbcVGGc'
              ),
            }
          ).instructions;
        })
      )
    ).flat();

    while (!isDone) {
      try {
        const recentBlockhash = await CONNECTION.getLatestBlockhash();
        const transaction = new Transaction({
          feePayer: NEW_FEE_PAYER_KEYPAIR.publicKey,
          ...recentBlockhash,
        }).add(...dogeUpdateIxs);

        const txHash = await CONNECTION.sendTransaction(transaction, [
          NEW_FEE_PAYER_KEYPAIR,
        ]);

        await CONNECTION.confirmTransaction(
          { ...recentBlockhash, signature: txHash },
          'confirmed'
        );

        console.log(`Slot ${slot} done`);
        isDone = true;
      } catch (err) {
        console.error(err);
        console.error(`Retrying slot ${slot}`);
        continue;
      }
    }
  }
}
