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
  CONNECTION: new Connection(
    // 'https://lively-white-violet.solana-devnet.quiknode.pro/41827280a5f3583db30c8c075a8338f0bd77cf6c/'
    'https://misty-dry-voice.solana-mainnet.quiknode.pro/8e1104744dfc354caa0cd1ff419c9325d70242f6/'
  ),
  FEE_PAYER_KEYPAIR: Keypair.fromSecretKey(
    Uint8Array.from(readJSONSync(`${__dirname}/keypairs/feePayer.json`))
  ),
  NEW_FEE_PAYER_KEYPAIR: Keypair.fromSecretKey(
    Uint8Array.from(readJSONSync(`${__dirname}/keypairs/newFeePayer.json`))
  ),
  CLAIMER_KEYPAIR: Keypair.fromSecretKey(
    Uint8Array.from(readJSONSync(`${__dirname}/keypairs/claimer.json`))
  ),
  DEMO_URI:
    'https://bafybeihka5b3upxmgbpcjikb6rqffmebabupyqwhtvbhpzbctekabkiznq.ipfs.nftstorage.link/',
  TO_WALLET: new PublicKey('72mS7DSoSBL2mnp7dnQggKD86bxtQ4o365yHEC1VivCQ'),
  PROGRAM_ID: new PublicKey('MRKi5uGnqvNozwDvETj6xgdQzVgCP6FVL51LAzFX7rd'),
};
