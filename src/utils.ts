import {
  NewFormat,
  MerkleDistributorInfo,
  BalanceTree,
} from '@saberhq/merkle-distributor/dist/cjs/utils';
import { PublicKey } from '@saberhq/solana-contrib';
import { u64 } from '@solana/spl-token';
import BN from 'bn.js';
import invariant from 'tiny-invariant';

import constants from './constants';

export function parseBalanceMap(balances: NewFormat[]): MerkleDistributorInfo {
  const dataByAddress = balances.reduce<{
    [address: string]: {
      amount: BN;
      flags?: { [flag: string]: boolean };
    };
  }>((memo, { address: account, earnings }) => {
    if (memo[account.toString()]) {
      throw new Error(`Duplicate address: ${account.toString()}`);
    }
    const parsedNum = new u64(earnings);
    if (parsedNum.lte(new u64(0))) {
      throw new Error(`Invalid amount for account: ${account.toString()}`);
    }

    memo[account.toString()] = {
      amount: parsedNum,
    };
    return memo;
  }, {});

  const sortedAddresses = Object.keys(dataByAddress).sort();

  // construct a tree
  const tree = new BalanceTree(
    sortedAddresses.map((address) => {
      const addressData = dataByAddress[address];
      invariant(addressData, 'addressData');
      return {
        account: new PublicKey(address),
        amount: addressData.amount,
      };
    })
  );

  // generate claims
  const claims = sortedAddresses.reduce<{
    [address: string]: {
      amount: u64;
      index: number;
      proof: Buffer[];
      flags?: { [flag: string]: boolean };
    };
  }>((memo, address, index) => {
    const addressData = dataByAddress[address];
    invariant(addressData, 'addressData');
    const { amount, flags } = addressData;
    memo[address] = {
      index,
      amount: amount,
      proof: tree.getProof(index, new PublicKey(address), amount),
      ...(flags ? { flags } : {}),
    };
    return memo;
  }, {});

  const tokenTotal: BN = sortedAddresses.reduce<BN>(
    (memo, key) => memo.add(dataByAddress[key]?.amount ?? new BN(0)),
    new BN(0)
  );

  return {
    merkleRoot: tree.getRoot(),
    tokenTotal: tokenTotal.toString(),
    claims,
  };
}

export const findDistributorKey = async (
  authority: PublicKey,
  base: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Buffer.from('MerkleDistributor'), authority.toBuffer(), base.toBuffer()],
    constants.PROGRAM_ID
  );
};

export const findClaimStatusKey = async (
  index: u64,
  distributor: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from('ClaimStatus'),
      index.toArrayLike(Buffer, 'le', 8),
      distributor.toBuffer(),
    ],
    constants.PROGRAM_ID
  );
};
