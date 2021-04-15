import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GenericNftTokenBalance,
} from '../../generated/schema';

import { tokenBalanceId } from './idTemplates';


export function loadOrCreateGenericNftTokenBalance(
  genericSmartBasketId: string,
  nftTokenAddress: Address,
  contractAddress: Address,
  tokenId: BigInt
): GenericNftTokenBalance {
  const id = tokenBalanceId(nftTokenAddress.toHex(), contractAddress.toHex(), tokenId.toString());
  let _nftTokenBalance = GenericNftTokenBalance.load(id);

  if (!_nftTokenBalance) {
    _nftTokenBalance = new GenericNftTokenBalance(id);
    _nftTokenBalance.nftTokenAddress = nftTokenAddress;
    _nftTokenBalance.tokenId = tokenId;
    _nftTokenBalance.contractAddress = contractAddress;
    _nftTokenBalance.smartBasket = genericSmartBasketId;
    _nftTokenBalance.nftTokenIds = [];
    _nftTokenBalance.save();
  }

  return _nftTokenBalance as GenericNftTokenBalance;
}
