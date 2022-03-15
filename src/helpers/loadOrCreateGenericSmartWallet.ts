import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GenericSmartWallet,
} from '../../generated/schema';

import { smartWalletId } from './idTemplates';

export function loadOrCreateGenericSmartWallet(
  contractAddress: Address,
  tokenId: BigInt,
  managerId: string
): GenericSmartWallet {
  const id = smartWalletId(contractAddress.toHex(), tokenId.toString(), managerId);
  let _genericSmartWallet = GenericSmartWallet.load(id);

  if (!_genericSmartWallet) {
    _genericSmartWallet = new GenericSmartWallet(id);
    _genericSmartWallet.tokenId = tokenId;
    _genericSmartWallet.contractAddress = contractAddress;
    _genericSmartWallet.assetTokens = [];
    _genericSmartWallet.save();
  }

  return _genericSmartWallet as GenericSmartWallet;
}
