import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AaveSmartWallet,
} from '../../generated/schema';


export function loadOrCreateAaveSmartWallet(
  tokenUuid: BigInt
): AaveSmartWallet {
  const id = tokenUuid.toString();
  let _aaveSmartWallet = AaveSmartWallet.load(id);

  if (!_aaveSmartWallet) {
    _aaveSmartWallet = new AaveSmartWallet(id);
    _aaveSmartWallet.tokenUuid = tokenUuid;
    _aaveSmartWallet.save();
  }

  return _aaveSmartWallet as AaveSmartWallet;
}
