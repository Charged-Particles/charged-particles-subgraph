import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AaveSmartWallet,
} from '../../generated/schema';

import { smartWalletId } from './idTemplates';

export function loadOrCreateAaveSmartWallet(
  contractAddress: Address,
  tokenId: BigInt
): AaveSmartWallet {
  const id = smartWalletId(contractAddress.toHex(), tokenId.toString());
  let _aaveSmartWallet = AaveSmartWallet.load(id);

  if (!_aaveSmartWallet) {
    _aaveSmartWallet = new AaveSmartWallet(id);
    _aaveSmartWallet.tokenId = tokenId;
    _aaveSmartWallet.contractAddress = contractAddress;
    _aaveSmartWallet.save();
  }

  return _aaveSmartWallet as AaveSmartWallet;
}
