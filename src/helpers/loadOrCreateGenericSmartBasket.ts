import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GenericSmartBasket,
} from '../../generated/schema';

import { ZERO } from './common';
import { smartWalletId } from './idTemplates';

export function loadOrCreateGenericSmartBasket(
  contractAddress: Address,
  tokenId: BigInt
): GenericSmartBasket {
  const id = smartWalletId(contractAddress.toHex(), tokenId.toString());
  let _genericSmartBasket = GenericSmartBasket.load(id);

  if (!_genericSmartBasket) {
    _genericSmartBasket = new GenericSmartBasket(id);
    _genericSmartBasket.tokenId = tokenId;
    _genericSmartBasket.contractAddress = contractAddress;
    _genericSmartBasket.totalTokens = ZERO;
    _genericSmartBasket.save();
  }

  return _genericSmartBasket as GenericSmartBasket;
}
