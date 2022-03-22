
import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import { tokenBalanceId } from './idTemplates';

import { store } from '@graphprotocol/graph-ts'


export function removeNftTokenBalance(
    nftTokenAddress: Address,
    contractAddress: Address,
    tokenId: BigInt,
    smartWalletId: string
  ): void {
    const id = tokenBalanceId(nftTokenAddress.toHex(), contractAddress.toHex(), tokenId.toString(), smartWalletId);
    store.remove('GenericNftTokenBalance',id);
  }