import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GenericWalletManager,
} from '../../generated/schema';

import {
  GenericWalletManager as GenericWalletManagerContract,
} from '../../generated/GenericWalletManager/GenericWalletManager';


export function loadOrCreateGenericWalletManager(
  genericWalletManagerAddress: Address
): GenericWalletManager {
  const id = genericWalletManagerAddress.toHex();
  let _genericWalletManager = GenericWalletManager.load(id);

  if (!_genericWalletManager) {
    _genericWalletManager = new GenericWalletManager(id);

    const boundWalletManager = GenericWalletManagerContract.bind(genericWalletManagerAddress);
    _genericWalletManager.owner = boundWalletManager.owner();
    _genericWalletManager.paused = boundWalletManager.isPaused();

    _genericWalletManager.name = 'generic';
    _genericWalletManager.address = genericWalletManagerAddress;

    _genericWalletManager.save();
  }

  return _genericWalletManager as GenericWalletManager;
}
