import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ESALevel
} from '../../generated/schema';

import { esaLevelId } from './idTemplates';

import { ZERO } from './common';

export function loadOrCreateEsaLevel(
  universeAddress: Address,
  address: Address,
): ESALevel {
  const id = esaLevelId(universeAddress.toHex(), address.toHex());
  let _esaLevel = ESALevel.load(id);

  if (!_esaLevel) {
    _esaLevel = new ESALevel(id);
    _esaLevel.universe = universeAddress.toHex();
    _esaLevel.address = address;
    _esaLevel.level = ZERO;
    _esaLevel.save();
  }

  return _esaLevel as ESALevel;
}
