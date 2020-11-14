import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AaveWalletManager,
} from '../../generated/schema';

import {
  AaveWalletManager as AaveWalletManagerContract,
} from '../../generated/AaveWalletManager/AaveWalletManager';


export function loadOrCreateAaveWalletManager(
  aaveWalletManagerAddress: Address
): AaveWalletManager {
  const id = aaveWalletManagerAddress.toHex();
  let _aaveWalletManager = AaveWalletManager.load(id);

  if (!_aaveWalletManager) {
    _aaveWalletManager = new AaveWalletManager(id);

    const boundWalletManager = AaveWalletManagerContract.bind(aaveWalletManagerAddress);
    _aaveWalletManager.owner = boundWalletManager.owner();
    _aaveWalletManager.paused = boundWalletManager.isPaused();

    _aaveWalletManager.name = 'aave';
    _aaveWalletManager.address = aaveWalletManagerAddress;

    _aaveWalletManager.save();
  }

  return _aaveWalletManager as AaveWalletManager;
}
