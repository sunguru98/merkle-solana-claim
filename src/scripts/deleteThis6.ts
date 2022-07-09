import { IDL } from '../doge-o-idl';
import * as anchor from '@project-serum/anchor';
import constants from '../constants';

import { PublicKey, Transaction } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

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

    console.log('Fee Payer:', FEE_PAYER_KEYPAIR.publicKey.toString());

    const dogeMint = new anchor.web3.PublicKey(
      '456j3qEsovMM8ZrfN8WjW6P9qeKnyML4Ei4kA3BPzenL'
    );
    const dogeMetadata = await Metadata.getPDA(dogeMint);
    const [dogeStats] = await PublicKey.findProgramAddress(
      [
        Buffer.from('dogeo'),
        FEE_PAYER_KEYPAIR.publicKey.toBytes(),
        dogeMint.toBytes(),
      ],
      dogeOProgramId
    );

    const ix = await dogeOProgram.methods
      .setAddresses()
      .accounts({
        initAuthority: FEE_PAYER_KEYPAIR.publicKey,
        dogeStats,
        dogeMint,
        dogeMetadata,
      })
      .instruction();

    const transaction = new Transaction({
      feePayer: FEE_PAYER_KEYPAIR.publicKey,
    }).add(ix);

    const txHash = await CONNECTION.sendTransaction(transaction, [
      FEE_PAYER_KEYPAIR,
    ]);
    await CONNECTION.confirmTransaction(txHash, 'singleGossip');

    console.log(txHash);
  } catch (err) {
    console.error(err.message);
  }
})();
