import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ESAMultiplier,
} from '../../generated/schema';

import { esaMultiplierId } from './idTemplates';

import { ZERO } from './common';

export function loadOrCreateEsaMultiplier(
  universeAddress: Address,
  assetTokenAddress: Address,
): ESAMultiplier {
  const id = esaMultiplierId(universeAddress.toHex(), assetTokenAddress.toHex());
  let _esaMultiplier = ESAMultiplier.load(id);

  if (!_esaMultiplier) {
    _esaMultiplier = new ESAMultiplier(id);
    _esaMultiplier.universe = universeAddress.toHex();
    _esaMultiplier.assetToken = assetTokenAddress;
    _esaMultiplier.multiplier = ZERO;
    _esaMultiplier.save();
  }

  return _esaMultiplier as ESAMultiplier;
}
