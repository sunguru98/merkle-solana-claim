import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { IDL } from '../idl';
import { config as dotconfig } from 'dotenv';

import * as anchor from '@project-serum/anchor';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  AccountLayout,
} from '@solana/spl-token';
import BN from 'bn.js';

const config = {
  APP_PORT: 3000,
  allowIpList: [],
  RPC_URL:
    process.env.NODE_ENV === 'development'
      ? clusterApiUrl('devnet')
      : process.env.RPC_URL || clusterApiUrl('mainnet-beta'), // recommend using custom RPC URL
  TIME_LOBBY_TO_START: 10, // default 10,
  COOLDOWN_PERIOD:
    process.env.NODE_ENV === 'development' ? 1000 * 10 : 1000 * 60 * 60 * 24,
  GAME_PROGRAM_ID: new PublicKey(
    'GAmedvouiMuUop6UUvGe8L5wdAQaSwXa77JPxs87pYpE'
  ),
  TREASURY_ADDRESS: new PublicKey(
    '81sWMLg1EgYps3nMwyeSW1JfjKgFqkGYPP85vTnkFzRn'
  ),
  STATE_AUTH: new PublicKey('3zKbAa4UEsHKx2Q6XQTZcmgv8NxmZtmns26AxZbcVGGc'),
  DOGE_PROGRAM_ID: new PublicKey(
    '2FJPtjHmYZBAeFLudMHFgQAq5vsEMW6uXhc8TqtVZvMS'
  ),
  DTRK_MINT: new PublicKey('DTRK1XRNaL6CxfFWwVLZMxyhiCZnwdP32CgzVDXWy5Td'),
};

const lobby = {
  _id: { $oid: '62c66fb99f265047bac70a51' },
  name: 'Loom Lobby',
  winners: [
    { value: 36.43592275380486 },
    { value: 25.362162743179567 },
    { value: 65.32983870657038 },
    { value: 66.01689711647505 },
    { value: 31.809784768476057 },
  ],
  track_solana_id: 'Gyb3uR4xQxyHgY7KigLioBuJMUXEe2v8cQ8maREDJH75',
  lobby_pda: '52r6Vrf72YcH6xvZogcTERhYzL41oeXHaH2zzW96Vpie',
  track_holder: 'AkSZK6dTvcTUzoCAr3wqF1VEZLpBbaWJvp6twDYAYa9D',
  location: 'Stadium',
  track_type: 'Space',
  event_type: 1,
  laps: 4,
  stat: 2,
  amount_of_coin: 200,
  players: [
    {
      name: 'Genesis Doge #250',
      symbol: 'GD',
      description: '3D Doge Racing on the Solana Blockchain.',
      seller_fee_basis_points: 600,
      image:
        'https://bafybeigw5szhhwtu5awqozdxjcub644ukjgkhlliyqgcbvfuygdoj6noze.ipfs.nftstorage.link/250.gif?ext=gif',
      attributes: [
        { trait_type: 'Background', value: 'Mint' },
        { trait_type: 'Clothes', value: 'Hawaiian Shirt' },
        { trait_type: 'Eyewear', value: 'Ski Goggles' },
        { trait_type: 'Hat', value: 'None' },
        { trait_type: 'Lineage', value: 'Thous' },
        { trait_type: 'Muzzle', value: 'Metal Cup' },
        { trait_type: 'Sex', value: 'Male' },
      ],
      collection: { name: 'Doge Track', family: 'Genesis Doge' },
      properties: {
        files: [
          {
            uri: 'https://bafybeigw5szhhwtu5awqozdxjcub644ukjgkhlliyqgcbvfuygdoj6noze.ipfs.nftstorage.link/250.gif?ext=gif',
            type: 'image/gif',
          },
        ],
        category: 'image',
        creators: [
          {
            address: 'RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA',
            share: 10,
          },
          {
            address: '3BYgk7hhvs5HreB99wG8dCoPiSxegTesb52Fawh4WmRC',
            share: 45,
          },
          {
            address: '6Ktm6CFneCEkWvyeRuRsp2oKg5uTHLNjr83gdtyEhmSu',
            share: 35,
          },
          {
            address: '2GFUVoAd8DEwwVTaarTAJkFGrRqJgsAt6TQbqtfD9UMc',
            share: 10,
          },
        ],
      },
      agility: 11,
      speed: 26,
      endurance: 14,
      dogeBump: null,
      winPercentage: 0,
      dogeMint: 'HDFjL7LZvZxumsP57GKUpH5JFqrGjWFYE3R7aVjCs834',
      initAuthority: '3zKbAa4UEsHKx2Q6XQTZcmgv8NxmZtmns26AxZbcVGGc',
      dogeMetadata: 'GqLihnC6ZyLdrGrGduVXF6HueaRMGdWuNyaaq4mPtuLR',
      count_of_win: 0,
      count_of_races: 0,
      solana_id: 250,
      dogName: 'RYDER',
      connected: 1657172026005,
      forRemove: true,
      doge_racer_pda: '5gBTPNJGQNnbyNu16HnaVHWT4RBogT3EhPUfsQiejVF1',
      doge_token_account: '7awiKgcWymYWSAJRZ9Hcy3zwPRARjhKZpkhuv4NuzGXV',
      doge_holder: '81sWMLg1EgYps3nMwyeSW1JfjKgFqkGYPP85vTnkFzRn',
    },
    {
      name: 'Genesis Doge #237',
      symbol: 'GD',
      description: '3D Doge Racing on the Solana Blockchain.',
      seller_fee_basis_points: 600,
      image:
        'https://bafybeie6dlafhdsdr6xbhcmtb72ynx4guikexfjrn4kqbw2ruffcisk6ae.ipfs.nftstorage.link/237.gif?ext=gif',
      attributes: [
        { trait_type: 'Background', value: 'Silver' },
        { trait_type: 'Clothes', value: 'Football Jersey' },
        { trait_type: 'Eyewear', value: 'Purple Goggles' },
        { trait_type: 'Hat', value: 'None' },
        { trait_type: 'Lineage', value: 'Adustus' },
        { trait_type: 'Muzzle', value: 'Dangerous Convict' },
        { trait_type: 'Sex', value: 'Male' },
      ],
      collection: { name: 'Doge Track', family: 'Genesis Doge' },
      properties: {
        files: [
          {
            uri: 'https://bafybeie6dlafhdsdr6xbhcmtb72ynx4guikexfjrn4kqbw2ruffcisk6ae.ipfs.nftstorage.link/237.gif?ext=gif',
            type: 'image/gif',
          },
        ],
        category: 'image',
        creators: [
          {
            address: 'RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA',
            share: 10,
          },
          {
            address: '3BYgk7hhvs5HreB99wG8dCoPiSxegTesb52Fawh4WmRC',
            share: 45,
          },
          {
            address: '6Ktm6CFneCEkWvyeRuRsp2oKg5uTHLNjr83gdtyEhmSu',
            share: 35,
          },
          {
            address: '2GFUVoAd8DEwwVTaarTAJkFGrRqJgsAt6TQbqtfD9UMc',
            share: 10,
          },
        ],
      },
      agility: 10,
      speed: 11,
      endurance: 23,
      dogeBump: null,
      winPercentage: 0,
      dogeMint: 'Fg7F3WoB5CUZ3frk5oASHXQaA4SdDqa9NeonTNpYiaQ3',
      initAuthority: '3zKbAa4UEsHKx2Q6XQTZcmgv8NxmZtmns26AxZbcVGGc',
      dogeMetadata: 'FGMbLUiJu7pCMckkV1JKyXY84bkMZj9bypj6Gf1puSVh',
      count_of_win: 0,
      count_of_races: 3,
      solana_id: 237,
      dogName: 'BUBBA',
      connected: 1657172141103,
      forRemove: true,
      doge_racer_pda: 'BCiKSvTq63zdg2JQHJuK6GapeaG2cokym68xexUsDV5u',
      doge_token_account: 'BPefH2xJjyMcHruiUBkUDRgGCVNd3nmpL7EoaNA1F4US',
      doge_holder: 'Ax9pJMwEFFNa7GKbwNQi9zkwJEwjsDxHwqyJFt6Dn1Zr',
    },
    {
      name: 'Genesis Doge #233',
      symbol: 'GD',
      description: '3D Doge Racing on the Solana Blockchain.',
      seller_fee_basis_points: 600,
      image:
        'https://bafybeie6dlafhdsdr6xbhcmtb72ynx4guikexfjrn4kqbw2ruffcisk6ae.ipfs.nftstorage.link/233.gif?ext=gif',
      attributes: [
        { trait_type: 'Background', value: 'Race Flag' },
        { trait_type: 'Clothes', value: 'Bulletproof Vest' },
        { trait_type: 'Eyewear', value: 'Swim Goggles' },
        { trait_type: 'Hat', value: 'Rugby Helmet' },
        { trait_type: 'Lineage', value: 'Gris' },
        { trait_type: 'Muzzle', value: 'Cage' },
        { trait_type: 'Sex', value: 'Female' },
      ],
      collection: { name: 'Doge Track', family: 'Genesis Doge' },
      properties: {
        files: [
          {
            uri: 'https://bafybeie6dlafhdsdr6xbhcmtb72ynx4guikexfjrn4kqbw2ruffcisk6ae.ipfs.nftstorage.link/233.gif?ext=gif',
            type: 'image/gif',
          },
        ],
        category: 'image',
        creators: [
          {
            address: 'RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA',
            share: 10,
          },
          {
            address: '3BYgk7hhvs5HreB99wG8dCoPiSxegTesb52Fawh4WmRC',
            share: 45,
          },
          {
            address: '6Ktm6CFneCEkWvyeRuRsp2oKg5uTHLNjr83gdtyEhmSu',
            share: 35,
          },
          {
            address: '2GFUVoAd8DEwwVTaarTAJkFGrRqJgsAt6TQbqtfD9UMc',
            share: 10,
          },
        ],
      },
      agility: 35,
      speed: 31,
      endurance: 50,
      dogeBump: null,
      winPercentage: 0,
      dogeMint: 'Frpn74D71Fu7U9XZ754joWpdHZibkV9zj1UNY3HSh6PE',
      initAuthority: '3zKbAa4UEsHKx2Q6XQTZcmgv8NxmZtmns26AxZbcVGGc',
      dogeMetadata: '9PBokb1gPWJ3yFTNPPJ96Kw6uH8iweeLbLXhkhsxaMM5',
      count_of_win: 0,
      count_of_races: 0,
      solana_id: 233,
      dogName: 'ROCKY',
      connected: 1657172166407,
      forRemove: true,
      doge_racer_pda: '4T6gpnLfHLYy29iwqGvjh7pSmufjYYY4JLuNGg8DD5Jg',
      doge_token_account: 'BPZdLj3FxevHD2Cyie5cXv13kspkFvFZZXhxKANtLBbf',
      doge_holder: 'F3enT51dxXXZLxQnrfxyMyNop2EtpAHq687EggPrxHcG',
    },
    {
      name: 'Genesis Doge #238',
      symbol: 'GD',
      description: '3D Doge Racing on the Solana Blockchain.',
      seller_fee_basis_points: 600,
      image:
        'https://bafybeie6dlafhdsdr6xbhcmtb72ynx4guikexfjrn4kqbw2ruffcisk6ae.ipfs.nftstorage.link/238.gif?ext=gif',
      attributes: [
        { trait_type: 'Background', value: 'Protocol' },
        { trait_type: 'Clothes', value: 'Purple Suede Vest' },
        { trait_type: 'Eyewear', value: 'Swim Goggles' },
        { trait_type: 'Hat', value: 'Witch' },
        { trait_type: 'Lineage', value: 'Gris' },
        { trait_type: 'Muzzle', value: 'Camo Snout' },
        { trait_type: 'Sex', value: 'Female' },
      ],
      collection: { name: 'Doge Track', family: 'Genesis Doge' },
      properties: {
        files: [
          {
            uri: 'https://bafybeie6dlafhdsdr6xbhcmtb72ynx4guikexfjrn4kqbw2ruffcisk6ae.ipfs.nftstorage.link/238.gif?ext=gif',
            type: 'image/gif',
          },
        ],
        category: 'image',
        creators: [
          {
            address: 'RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA',
            share: 10,
          },
          {
            address: '3BYgk7hhvs5HreB99wG8dCoPiSxegTesb52Fawh4WmRC',
            share: 45,
          },
          {
            address: '6Ktm6CFneCEkWvyeRuRsp2oKg5uTHLNjr83gdtyEhmSu',
            share: 35,
          },
          {
            address: '2GFUVoAd8DEwwVTaarTAJkFGrRqJgsAt6TQbqtfD9UMc',
            share: 10,
          },
        ],
      },
      agility: 31,
      speed: 36,
      endurance: 49,
      dogeBump: null,
      winPercentage: 0,
      dogeMint: '8SSZPJLut1ZfLhtizbydWGMvc3hzea9Q82iJSeA9CUCG',
      initAuthority: '3zKbAa4UEsHKx2Q6XQTZcmgv8NxmZtmns26AxZbcVGGc',
      dogeMetadata: 'A594UTonZE2ERrrUYqWXdMpXr8U4XHNGjNUFNLfwqSCL',
      count_of_win: 0,
      count_of_races: 0,
      solana_id: 238,
      dogName: 'LEVI',
      connected: 1657172192035,
      forRemove: true,
      doge_racer_pda: '7TUDDNoH3LYdxZrQ4Krrwo7qCkZhqkc7pYjN9B8fqhAh',
      doge_token_account: 'FBnpEbShtMy2ckfZnyHT7N8N4ywSJhjj9MC1ZFAhv8Vp',
      doge_holder: 'trueG9tqXnY8oQy4PJ6rXuAF7Qh9HRtx8VgDGB4J1Q4',
    },
    {
      name: 'Genesis Doge #246',
      symbol: 'GD',
      description: '3D Doge Racing on the Solana Blockchain.',
      seller_fee_basis_points: 600,
      image:
        'https://bafybeigw5szhhwtu5awqozdxjcub644ukjgkhlliyqgcbvfuygdoj6noze.ipfs.nftstorage.link/246.gif?ext=gif',
      attributes: [
        { trait_type: 'Background', value: 'Race Flag' },
        { trait_type: 'Clothes', value: 'Cricket Jersey' },
        { trait_type: 'Eyewear', value: 'Swim Goggles' },
        { trait_type: 'Hat', value: 'None' },
        { trait_type: 'Lineage', value: 'Culpeo' },
        { trait_type: 'Muzzle', value: 'Metal Cup' },
        { trait_type: 'Sex', value: 'Female' },
      ],
      collection: { name: 'Doge Track', family: 'Genesis Doge' },
      properties: {
        files: [
          {
            uri: 'https://bafybeigw5szhhwtu5awqozdxjcub644ukjgkhlliyqgcbvfuygdoj6noze.ipfs.nftstorage.link/246.gif?ext=gif',
            type: 'image/gif',
          },
        ],
        category: 'image',
        creators: [
          {
            address: 'RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA',
            share: 10,
          },
          {
            address: '3BYgk7hhvs5HreB99wG8dCoPiSxegTesb52Fawh4WmRC',
            share: 45,
          },
          {
            address: '6Ktm6CFneCEkWvyeRuRsp2oKg5uTHLNjr83gdtyEhmSu',
            share: 35,
          },
          {
            address: '2GFUVoAd8DEwwVTaarTAJkFGrRqJgsAt6TQbqtfD9UMc',
            share: 10,
          },
        ],
      },
      agility: 21,
      speed: 14,
      endurance: 21,
      dogeBump: null,
      winPercentage: 0,
      dogeMint: 'CsPSJCvWos8v7dk6vAm1e9is5Zhjh5PaZsxopxyq27qP',
      initAuthority: '3zKbAa4UEsHKx2Q6XQTZcmgv8NxmZtmns26AxZbcVGGc',
      dogeMetadata: '9JC2QM3NqGBy2XzqhfWbTjT5Jixd69ajAvZB4AdHSyzN',
      count_of_win: 0,
      count_of_races: 1,
      solana_id: 246,
      dogName: 'HARLEY',
      connected: 1657172288988,
      forRemove: true,
      doge_racer_pda: 'Gy8GNrD7AhzCDcghtofdUDXGEGXnCZ9LFYonJCN23er6',
      doge_token_account: 'EpKsLe3F5PAC4eHhJ1KFiCxuP9UrPYYcgzVByG27r488',
      doge_holder: 'ZDacHwFBUBAcB49NcnKtrdC6UEi3tQ2Ui6aZMxwPFN3',
    },
  ],
  raceMap: [
    [
      3099, 5997, 9021, 12090, 15211, 18379, 21214, 24118, 27104, 29941, 32880,
      35780, 38657, 41791, 44610, 47615, 50483, 53392, 56303, 60010,
    ],
    [
      3139, 6169, 9334, 12362, 15479, 18425, 21347, 24321, 27444, 30366, 33474,
      36561, 39446, 42253, 45058, 48102, 51208, 54381, 57547, 59924,
    ],
    [
      2964, 6133, 8944, 11816, 14804, 17983, 21141, 24228, 27402, 30262, 33458,
      36642, 39456, 42552, 45643, 48599, 51557, 54580, 57686, 59852,
    ],
    [
      2989, 6148, 9054, 12008, 15059, 17956, 20938, 23819, 26659, 29529, 32338,
      35440, 38286, 41345, 44264, 47117, 50076, 52973, 55937, 59732,
    ],
    [
      3166, 6263, 9242, 12329, 15319, 18190, 21191, 24102, 27182, 30367, 33343,
      36174, 39182, 42249, 45208, 48220, 51116, 54250, 57090, 59930,
    ],
  ],
  createdAt: { $date: { $numberLong: '1657171897124' } },
  updatedAt: { $date: { $numberLong: '1657172299999' } },
  __v: 0,
  timer: { $date: { $numberLong: '1657172288993' } },
  inProcess: { $date: { $numberLong: '1657172288996' } },
};

const getDogeRacerPDA = async (dogeMint: PublicKey, dogeOPDA: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from('dogeracer'), dogeMint.toBuffer(), dogeOPDA.toBuffer()],
    config.GAME_PROGRAM_ID
  );
};

const getDogeOStatsPDA = async (dogeMint: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from('dogeo'), config.STATE_AUTH.toBuffer(), dogeMint.toBuffer()],
    config.DOGE_PROGRAM_ID
  );
};

const getRaceStatePDA = async (
  lobbyAccount: PublicKey,
  winnerDoge: PublicKey,
  dogeHolder: PublicKey
) => {
  return PublicKey.findProgramAddress(
    [
      Buffer.from('racedata'),
      lobbyAccount.toBuffer(),
      winnerDoge.toBuffer(),
      dogeHolder.toBuffer(),
    ],
    config.GAME_PROGRAM_ID
  );
};

(async function distributeRewards(
  lobby: any,
  winnerId: number,
  raceStartedAt: number
) {
  dotconfig();

  const { players, lobby_pda, track_holder, track_solana_id } = lobby;

  const winnerDoge = players.find((p: any) => p.solana_id === winnerId);
  if (!winnerDoge) throw new Error('Cannot find winner');

  const raceStarted = Math.floor(raceStartedAt / 1000);
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const authKeypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(process.env.AUTH_KEY!))
  );
  const wallet = new anchor.Wallet(authKeypair);
  const gameProgram = new anchor.Program(
    IDL,
    config.GAME_PROGRAM_ID,
    new anchor.Provider(connection, wallet, { commitment: 'confirmed' })
  );

  const trackMint = new PublicKey(track_solana_id);
  const dtrkMint = config.DTRK_MINT;
  const dogeMint = new PublicKey(winnerDoge.dogeMint);
  const dogeMetadata = await Metadata.getPDA(dogeMint);
  const lobbyAccount = new PublicKey(lobby_pda);
  const trackHolder = new PublicKey(track_holder);
  const dogeHolder = new PublicKey(winnerDoge.doge_holder);
  const [dogeOPda] = await getDogeOStatsPDA(dogeMint);
  const [dogeRacerAccount] = await getDogeRacerPDA(dogeMint, dogeOPda);
  const [raceDataState] = await getRaceStatePDA(
    lobbyAccount,
    dogeRacerAccount,
    dogeHolder
  );

  const wsolMint = NATIVE_MINT;
  const treasuryAddress = config.TREASURY_ADDRESS;
  const treasuryWsolToken = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    config.TREASURY_ADDRESS
  );

  const lobbyDtrkToken = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    dtrkMint,
    lobbyAccount,
    true
  );
  const lobbyWsolToken = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    lobbyAccount,
    true
  );
  const trackHolderDtrk = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    dtrkMint,
    trackHolder
  );

  const raceStartedBN = new BN(raceStarted);
  const cacheRaceIx = await gameProgram.methods
    .cacheRace(raceStartedBN)
    .accounts({
      authority: authKeypair.publicKey,
      initAuthority: config.STATE_AUTH,
      raceDataState,
      lobbyAccount,
      winnerDogeRacerAccount: dogeRacerAccount,
      dogeOPda,
      dogeMint,
      dogeMetadata,
      trackMint,
      trackHolder,
      dogeHolder,
      systemProgram: SystemProgram.programId,
    })
    // @ts-ignore
    .signers([authKeypair.publicKey])
    .instruction();

  const { racers } = await gameProgram.account.lobbyState.fetch(lobbyAccount);

  const concludeRaceIxs = await Promise.all(
    racers.map(async (r) => {
      console.log(r.toString());
      const p = players.find((p: any) => p.doge_racer_pda === r.toString());
      if (!p) throw new Error('Cannot find racer');

      const dogeMint = new PublicKey(p.dogeMint);
      const dogeHolder = new PublicKey(p.doge_holder);
      const dogeMetadata = await Metadata.getPDA(dogeMint);
      const [dogeOPda] = await getDogeOStatsPDA(dogeMint);
      const [dogeRacerAccount] = await getDogeRacerPDA(dogeMint, dogeOPda);

      const { dogeHolderDtrk } = await gameProgram.account.dogeRacerState.fetch(
        dogeRacerAccount
      );

      return (
        gameProgram.methods
          .concludeRace(
            p.solana_id === winnerId,
            (p.count_of_win / p.count_of_races || 0) * 100
          )
          .accounts({
            authority: authKeypair.publicKey,
            initAuthority: config.STATE_AUTH,
            dogeRacerAccount,
            lobbyAccount,
            dogeOPda,
            dogeMint,
            dogeMetadata,
            dtrkMint,
            wsolMint,
            trackMint,
            dogeHolderDtrk,
            lobbyDtrkToken,
            lobbyWsolToken,
            trackHolderDtrk,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            dogeOProgram: config.DOGE_PROGRAM_ID,
            treasuryWsolToken,
            treasuryAddress,
            trackHolder,
            dogeHolder,
          })
          // @ts-ignore
          .signers([authKeypair.publicKey])
          .instruction()
      );
    })
  );

  const transactions = [];

  for (const tx of [1, 2, 3, 4]) {
    let isDone = false;
    while (!isDone) {
      console.log(`Tx slot: ${tx}`);
      try {
        const recentBlockhash = await connection.getLatestBlockhash();
        const transaction = new Transaction({
          feePayer: authKeypair.publicKey,
          ...recentBlockhash,
        });

        if (tx === 1 && !(await connection.getAccountInfo(treasuryWsolToken))) {
          const transferSOLIx = SystemProgram.transfer({
            fromPubkey: authKeypair.publicKey,
            toPubkey: treasuryWsolToken,
            lamports: await connection.getMinimumBalanceForRentExemption(
              AccountLayout.span
            ),
            programId: ASSOCIATED_TOKEN_PROGRAM_ID,
          });

          const initializeTokenIx =
            Token.createAssociatedTokenAccountInstruction(
              ASSOCIATED_TOKEN_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              NATIVE_MINT,
              treasuryWsolToken,
              treasuryAddress,
              authKeypair.publicKey
            );

          transaction.add(transferSOLIx, initializeTokenIx);
        } else if (tx === 2) {
          transaction.add(cacheRaceIx, ...concludeRaceIxs.slice(0, 2));
        } else if (tx === 3) {
          transaction.add(...concludeRaceIxs.slice(2, 4));
        } else if (tx === 4) {
          transaction.add(...concludeRaceIxs.slice(4));
        }

        if (transaction.instructions.length > 0) {
          const txHash = await connection.sendTransaction(transaction, [
            authKeypair,
          ]);

          await connection.confirmTransaction({
            signature: txHash,
            ...recentBlockhash,
          });

          transactions.push(txHash);

          console.log(txHash);

          isDone = true;
        } else {
          break;
        }
      } catch (err) {
        console.error(err);
        continue;
      }
    }
  }

  return {
    raceDataState: raceDataState.toString(),
    transactions,
  };
})(lobby, 238, 1657017995015);

// export default distributeRewards;
