import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import mintList from '../json/doge-dev-track-list.json';

import constants from '../constants';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { ASSOCIATED_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';

(async function (amountToSend: number, receiver: PublicKey) {
  const senderKeypair = Keypair.fromSecretKey(
    Uint8Array.from([
      158, 147, 204, 203, 4, 1, 11, 105, 103, 113, 10, 175, 130, 4, 187, 72, 60,
      212, 20, 28, 196, 118, 22, 231, 18, 127, 121, 56, 131, 48, 145, 51, 89,
      153, 241, 90, 123, 6, 43, 108, 116, 249, 23, 235, 7, 38, 82, 172, 82, 110,
      21, 134, 45, 110, 172, 196, 76, 115, 251, 220, 12, 189, 62, 113,
    ])
  );

  console.log(`Sender: ${senderKeypair.publicKey.toString()}`);

  const { CONNECTION } = constants;
  const instructionsPerTx = 5;
  const batches = Array.from(
    { length: amountToSend / instructionsPerTx },
    (_, i) => i + 1
  );

  let counter = 0;

  for (const batch of batches) {
    console.log(`Batch number ${batch}`);
    let txCount = 1;
    const instructions = [];

    while (txCount <= instructionsPerTx) {
      const mintAddressRaw = mintList[counter];
      if (!mintAddressRaw) throw new Error('Invalid Mint address');

      const mintPub = new PublicKey(mintAddressRaw);
      const tokenAddress = await Token.getAssociatedTokenAddress(
        ASSOCIATED_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintPub,
        senderKeypair.publicKey
      );

      const receiverTokenAddress = await Token.getAssociatedTokenAddress(
        ASSOCIATED_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintPub,
        receiver
      );

      const {
        value: { uiAmount },
      } = await CONNECTION.getTokenAccountBalance(tokenAddress);

      if (uiAmount === 0) {
        console.log('Token account empty. Moving to next mint');
        counter += 1;
        continue;
      }

      const receiverTokenInfo = await CONNECTION.getAccountInfo(
        receiverTokenAddress
      );

      !receiverTokenInfo &&
        instructions.push(
          Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintPub,
            receiverTokenAddress,
            receiver,
            senderKeypair.publicKey
          )
        );

      instructions.push(
        Token.createTransferCheckedInstruction(
          TOKEN_PROGRAM_ID,
          tokenAddress,
          mintPub,
          receiverTokenAddress,
          senderKeypair.publicKey,
          [],
          1,
          0
        )
      );

      txCount += 1;
      counter += 1;
    }

    const transaction = new Transaction({ feePayer: senderKeypair.publicKey });
    transaction.add(...instructions);
    const txHash = await CONNECTION.sendTransaction(transaction, [
      senderKeypair,
    ]);

    await CONNECTION.confirmTransaction(txHash, 'singleGossip');

    console.log(`Batch ${batch} complete. Tx Hash: ${txHash}`);
  }
})(10, new PublicKey('5oo4yCsLFpiW5tDVUVczL9b7kZuoytmdTzxmXs1W29EC'));
