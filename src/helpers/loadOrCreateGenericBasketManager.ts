import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GenericBasketManager,
} from '../../generated/schema';

import {
  GenericBasketManager as GenericBasketManagerContract,
} from '../../generated/GenericBasketManager/GenericBasketManager';


export function loadOrCreateGenericBasketManager(
  genericBasketManagerAddress: Address
): GenericBasketManager {
  const id = genericBasketManagerAddress.toHex();
  let _genericBasketManager = GenericBasketManager.load(id);

  if (!_genericBasketManager) {
    _genericBasketManager = new GenericBasketManager(id);

    const boundBasketManager = GenericBasketManagerContract.bind(genericBasketManagerAddress);
    _genericBasketManager.owner = boundBasketManager.owner();
    _genericBasketManager.paused = boundBasketManager.isPaused();

    _genericBasketManager.name = 'generic';
    _genericBasketManager.address = genericBasketManagerAddress;

    _genericBasketManager.save();
  }

  return _genericBasketManager as GenericBasketManager;
}
