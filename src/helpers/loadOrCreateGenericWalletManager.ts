import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GenericWalletManager,
} from '../../generated/schema';

import {
  GenericWalletManager as GenericWalletManagerContract,
} from '../../generated/GenericWalletManager/GenericWalletManager';

import {
  GenericWalletManagerB as GenericWalletManagerContractB,
} from '../../generated/GenericWalletManagerB/GenericWalletManagerB';


export function loadOrCreateGenericWalletManager(
  genericWalletManagerAddress: Address,
  genericWalletManagerVersion: String = 'A'
): GenericWalletManager {
  const id = genericWalletManagerAddress.toHex();
  let _genericWalletManager = GenericWalletManager.load(id);

  const isVersionB = (genericWalletManagerVersion === 'B');

  if (!_genericWalletManager) {
    _genericWalletManager = new GenericWalletManager(id);

    if (isVersionB) {
      const boundWalletManager = GenericWalletManagerContractB.bind(genericWalletManagerAddress);
      _genericWalletManager.owner = boundWalletManager.owner();
      _genericWalletManager.paused = boundWalletManager.isPaused();
    } else {
      const boundWalletManager = GenericWalletManagerContract.bind(genericWalletManagerAddress);
      _genericWalletManager.owner = boundWalletManager.owner();
      _genericWalletManager.paused = boundWalletManager.isPaused();
    }

    _genericWalletManager.name = isVersionB ? 'generic.B' : 'generic';
    _genericWalletManager.address = genericWalletManagerAddress;

    _genericWalletManager.save();
  }

  return _genericWalletManager as GenericWalletManager;
}
