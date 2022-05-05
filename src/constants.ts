import { PublicKey } from '@saberhq/solana-contrib';
import data from './json/data.json';

import { clusterApiUrl, Keypair, Connection } from '@solana/web3.js';
import { readJSONSync } from 'fs-extra';

export default {
  TOKEN_MINT: new PublicKey('A95hmayn6q2dQh9cyeCRHGLYVwQc9qhDMJU1WDYj3PVP'),
  TOKEN_DECIMALS: 0,
  SOURCE_TOKEN_ACCOUNT: new PublicKey(
    '7XTNU9yHkRXtNqNsMWa6jcc9iyNWstmqESokCJV1SCqZ'
  ),
  AIRDROP_DATA: data,
  CONNECTION: new Connection(clusterApiUrl('devnet'), {
    confirmTransactionInitialTimeout: 120 * 1000,
    commitment: 'confirmed',
  }),
  FEE_PAYER_KEYPAIR: Keypair.fromSecretKey(
    Uint8Array.from(readJSONSync(`${__dirname}/keypairs/feePayer.json`))
  ),
  CLAIMER_KEYPAIR: Keypair.fromSecretKey(
    Uint8Array.from(readJSONSync(`${__dirname}/keypairs/claimer.json`))
  ),
  DEMO_URI:
    'https://bafybeihka5b3upxmgbpcjikb6rqffmebabupyqwhtvbhpzbctekabkiznq.ipfs.nftstorage.link/',
  TO_WALLET: new PublicKey('72mS7DSoSBL2mnp7dnQggKD86bxtQ4o365yHEC1VivCQ'),
  PROGRAM_ID: new PublicKey('MRKi5uGnqvNozwDvETj6xgdQzVgCP6FVL51LAzFX7rd'),
};
