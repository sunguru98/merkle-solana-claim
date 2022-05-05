import {
  CreateMasterEditionV3,
  CreateMetadataV2,
  Creator,
  DataV2,
  MasterEdition,
  Metadata,
  UpdateMetadataV2,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  MintLayout,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import BN from 'bn.js';
import { readJSONSync, writeJSONSync } from 'fs-extra';
import constants from '../constants';

(async function (editionLength: number) {
  try {
    const {
      FEE_PAYER_KEYPAIR,
      CONNECTION,
      DEMO_URI: URI,
      TO_WALLET,
    } = constants;
    const editions = Array.from({ length: editionLength }, (_, i) => i + 3054);

    console.log(`Fee payer ${FEE_PAYER_KEYPAIR.publicKey.toString()}`);

    for (const edition of editions) {
      const mintKeypair = Keypair.generate();
      const createAccIx = SystemProgram.createAccount({
        fromPubkey: FEE_PAYER_KEYPAIR.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        lamports: await CONNECTION.getMinimumBalanceForRentExemption(
          MintLayout.span
        ),
        programId: TOKEN_PROGRAM_ID,
        space: MintLayout.span,
      });

      const initMintIx = Token.createInitMintInstruction(
        TOKEN_PROGRAM_ID,
        mintKeypair.publicKey,
        0,
        FEE_PAYER_KEYPAIR.publicKey,
        FEE_PAYER_KEYPAIR.publicKey
      );

      const uri = URI + `${edition}.json`;

      const metadataPDA = await Metadata.getPDA(mintKeypair.publicKey);
      const masterEditionPDA = await MasterEdition.getPDA(
        mintKeypair.publicKey
      );
      const metadataData = new DataV2({
        collection: null,
        uses: null,
        creators: [
          new Creator({
            address: FEE_PAYER_KEYPAIR.publicKey.toString(),
            share: 100,
            verified: true,
          }),
        ],
        sellerFeeBasisPoints: 600,
        name: `Genesis Doge ${edition}`,
        symbol: 'GD',
        uri,
      });

      const createMetadataIx = new CreateMetadataV2(
        {
          feePayer: FEE_PAYER_KEYPAIR.publicKey,
        },
        {
          metadata: metadataPDA,
          metadataData,
          mint: mintKeypair.publicKey,
          mintAuthority: FEE_PAYER_KEYPAIR.publicKey,
          updateAuthority: FEE_PAYER_KEYPAIR.publicKey,
        }
      );

      const createMasterEditionIx = new CreateMasterEditionV3(
        {
          feePayer: FEE_PAYER_KEYPAIR.publicKey,
        },
        {
          edition: masterEditionPDA,
          metadata: metadataPDA,
          mint: mintKeypair.publicKey,
          mintAuthority: FEE_PAYER_KEYPAIR.publicKey,
          updateAuthority: FEE_PAYER_KEYPAIR.publicKey,
          maxSupply: new BN(0),
        }
      );

      const tokenAddress = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintKeypair.publicKey,
        FEE_PAYER_KEYPAIR.publicKey
      );

      const createTokenIx = Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintKeypair.publicKey,
        tokenAddress,
        FEE_PAYER_KEYPAIR.publicKey,
        FEE_PAYER_KEYPAIR.publicKey
      );

      const mintTokenIx = Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        mintKeypair.publicKey,
        tokenAddress,
        FEE_PAYER_KEYPAIR.publicKey,
        [],
        1
      );

      const updateMetadataIx = new UpdateMetadataV2(
        {
          feePayer: FEE_PAYER_KEYPAIR.publicKey,
        },
        {
          metadata: metadataPDA,
          updateAuthority: FEE_PAYER_KEYPAIR.publicKey,
          primarySaleHappened: true,
        }
      );

      const tx = new Transaction();
      tx.add(
        createAccIx,
        initMintIx,
        createTokenIx,
        mintTokenIx,
        createMetadataIx,
        createMasterEditionIx,
        updateMetadataIx
      );

      if (TO_WALLET) {
        const toAddress = await Token.getAssociatedTokenAddress(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          mintKeypair.publicKey,
          TO_WALLET
        );
        const createToAddressIx = Token.createAssociatedTokenAccountInstruction(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          mintKeypair.publicKey,
          toAddress,
          TO_WALLET,
          FEE_PAYER_KEYPAIR.publicKey
        );
        const sendTokenIx = Token.createTransferCheckedInstruction(
          TOKEN_PROGRAM_ID,
          tokenAddress,
          mintKeypair.publicKey,
          toAddress,
          FEE_PAYER_KEYPAIR.publicKey,
          [],
          1,
          0
        );

        tx.add(createToAddressIx, sendTokenIx);
      }

      const txHash = await CONNECTION.sendTransaction(tx, [
        FEE_PAYER_KEYPAIR,
        mintKeypair,
      ]);
      await CONNECTION.confirmTransaction(txHash);

      console.log(`Minted Edition ${edition}. Tx Hash ${txHash}`);

      const mintList = readJSONSync(`${__dirname}/../json/mintList.json`, {
        encoding: 'utf-8',
      });
      mintList.push(mintKeypair.publicKey.toString());
      writeJSONSync(`${__dirname}/../json/mintList.json`, mintList, {
        spaces: 2,
      });
    }
  } catch (err) {
    console.error(err);
  }
})(946);
