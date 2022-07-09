import { PublicKey } from '@solana/web3.js';
import { writeJSONSync } from 'fs-extra';
import dogDevList from '../json/doge-dog-list.json';
import constants from '../constants';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

(async function () {
  try {
    const { CONNECTION } = constants;
    const dataDev: Record<string, any> = {};
    for (const dogeMintS of dogDevList) {
      const dogeMint = new PublicKey(dogeMintS);
      const dogeMetadata = await Metadata.getPDA(dogeMint);
      const dogeOProgramId = new PublicKey(
        'BQmZuoj4q3gU7Qzqi3siJ4R48Tj9uua3AMDhqTDNDdFu'
      );
      const [dogeStats] = await PublicKey.findProgramAddress(
        [
          Buffer.from('dogeo'),
          new PublicKey(
            '4DRR9ZY5vBZboaKmLFpuUsmFLCHcmZHkpDZaobyPnB5f'
          ).toBytes(),
          dogeMint.toBytes(),
        ],
        dogeOProgramId
      );

      const {
        data: {
          data: { name },
        },
      } = await Metadata.load(CONNECTION, dogeMetadata);

      const edition = parseInt(name.replace('Genesis Doge #', ''));
      dataDev[edition.toString()] = {
        edition,
        mint: dogeMintS,
        metadata: dogeMetadata.toString(),
        stats: dogeStats.toString(),
      };
    }
    writeJSONSync(`${__dirname}/../json/data.json`, dataDev, { spaces: 2 });
  } catch (err) {
    console.error(err.message);
  }
})();
