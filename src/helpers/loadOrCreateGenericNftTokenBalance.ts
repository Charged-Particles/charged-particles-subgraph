import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GenericNftTokenBalance,
  NftBalanceByTokenId,
} from '../../generated/schema';

import { ZERO, standardEntityId } from './common';

export function loadOrCreateGenericNftTokenBalance(
  genericSmartBasketId: string,
  nftTokenAddress: Address,
  contractAddress: Address,
  tokenId: BigInt
): GenericNftTokenBalance {
  const id = standardEntityId([nftTokenAddress.toHex(), contractAddress.toHex(), tokenId.toString(), genericSmartBasketId]);
  let _nftTokenBalance = GenericNftTokenBalance.load(id);

  if (!_nftTokenBalance) {
    _nftTokenBalance = new GenericNftTokenBalance(id);
    _nftTokenBalance.nftTokenAddress = nftTokenAddress;
    _nftTokenBalance.tokenId = tokenId;
    _nftTokenBalance.contractAddress = contractAddress;
    _nftTokenBalance.smartBasket = genericSmartBasketId;
    _nftTokenBalance.save();
  }

  return _nftTokenBalance as GenericNftTokenBalance;
}

export function loadOrCreateNftBalanceByTokenId(
  nftTokenAddress: Address,
  nftTokenId: BigInt,
  contractAddress: Address,
  tokenId: BigInt,
  nftTokenBalance: GenericNftTokenBalance
): NftBalanceByTokenId {
  const id = standardEntityId([nftTokenAddress.toHex(), nftTokenId.toString(), contractAddress.toHex(), tokenId.toString()]);
  let _nftBalance = NftBalanceByTokenId.load(id);

  if (!_nftBalance) {
    _nftBalance = new NftBalanceByTokenId(id);
    _nftBalance.parent = nftTokenBalance.id;
    _nftBalance.tokenId = nftTokenId;
    _nftBalance.tokenBalance = ZERO;
    _nftBalance.save();
  }

  return _nftBalance as NftBalanceByTokenId;
}
