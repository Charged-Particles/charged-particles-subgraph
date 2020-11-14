import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Universe,
} from '../../generated/schema';

import {
  Universe as UniverseContract,
} from '../../generated/Universe/Universe';


export function loadOrCreateUniverse(
  universeAddress: Address
): Universe {
  const id = universeAddress.toHex();
  let _universe = Universe.load(id);

  if (!_universe) {
    _universe = new Universe(id);
    const boundUniverse = UniverseContract.bind(universeAddress);

    _universe.owner = boundUniverse.owner();
    _universe.save();
  }

  return _universe as Universe;
}
