import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GenericBasketManager,
} from '../../generated/schema';

import {
  GenericBasketManager as GenericBasketManagerContract,
} from '../../generated/GenericBasketManager/GenericBasketManager';

import {
  GenericBasketManagerB as GenericBasketManagerContractB,
} from '../../generated/GenericBasketManagerB/GenericBasketManagerB';


export function loadOrCreateGenericBasketManager(
  genericBasketManagerAddress: Address,
  genericBasketManagerVersion: String = 'A'
): GenericBasketManager {
  const id = genericBasketManagerAddress.toHex();
  let _genericBasketManager = GenericBasketManager.load(id);

  const isVersionB = (genericBasketManagerVersion === 'B');

  if (!_genericBasketManager) {
    _genericBasketManager = new GenericBasketManager(id);

    if (isVersionB) {
      const boundBasketManager = GenericBasketManagerContractB.bind(genericBasketManagerAddress);
      _genericBasketManager.owner = boundBasketManager.owner();
      _genericBasketManager.paused = boundBasketManager.isPaused();
    } else {
      const boundBasketManager = GenericBasketManagerContract.bind(genericBasketManagerAddress);
      _genericBasketManager.owner = boundBasketManager.owner();
      _genericBasketManager.paused = boundBasketManager.isPaused();
    }

    _genericBasketManager.name = isVersionB ? 'generic.B' : 'generic';
    _genericBasketManager.address = genericBasketManagerAddress;
    _genericBasketManager.save();
  }

  return _genericBasketManager as GenericBasketManager;
}
