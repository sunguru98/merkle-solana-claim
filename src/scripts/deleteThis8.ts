// import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { MintLayout } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { writeJSONSync } from 'fs-extra';

import dogeList from '../json/doge-dog-list.json';
import constants from '../constants';

(async function () {
  try {
    const { CONNECTION } = constants;
    const needToChangeDoges: string[] = [];
    for (const doge of dogeList) {
      // const dogeMetadata = await Metadata.getPDA(new PublicKey(doge));
      // const oldDogeStats = (
      //   await PublicKey.findProgramAddress(
      //     [
      //       Buffer.from('dogeo'),
      //       new PublicKey(
      //         '4uBfVPmUwMYVjFbDDqMBCxWhFH7PDd721Texs36uBGCo'
      //       ).toBuffer(),
      //       new PublicKey(doge).toBuffer(),
      //     ],
      //     new PublicKey('BQmZuoj4q3gU7Qzqi3siJ4R48Tj9uua3AMDhqTDNDdFu')
      //   )
      // )[0];

      // const {
      //   data: { updateAuthority },
      // } = await Metadata.load(connection, dogeMetadata);

      // if (
      //   updateAuthority.toString() !==
      //   '3zKbAa4UEsHKx2Q6XQTZcmgv8NxmZtmns26AxZbcVGGc'
      // ) {
      //   console.log(`${doge}`, updateAuthority.toString());
      //   needToChangeDoges.push(doge);
      // }

      // if (await connection.getAccountInfo(oldDogeStats)) {
      //   console.log(`${doge}`);
      //   needToChangeDoges.push(doge);
      // }

      const dogeAccountInfo = await CONNECTION.getAccountInfo(
        new PublicKey(doge)
      );
      const decodedAccountInfo = MintLayout.decode(dogeAccountInfo!.data!);
      const dogeSupply = parseInt(
        Buffer.from(decodedAccountInfo.supply).readBigUInt64LE(0).toString()
      );

      if (dogeSupply === 1) {
        console.log(`${doge} is present`);
        needToChangeDoges.push(doge);
      } else {
        console.log(`${doge} is burnt`);
      }
    }

    writeJSONSync(`${__dirname}/../json/oldUaDoges.json`, needToChangeDoges, {
      spaces: 2,
    });
  } catch (err) {
    console.error(err);
  }
})();
