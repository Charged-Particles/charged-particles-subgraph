import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ChargedParticles,
} from '../../generated/schema';

import {
  ChargedParticles as ChargedParticlesContract,
} from '../../generated/ChargedParticles/ChargedParticles';


export function loadOrCreateChargedParticles(
  chargedParticlesAddress: Address
): ChargedParticles {
  const id = chargedParticlesAddress.toHex();
  let _chargedParticles = ChargedParticles.load(id);

  if (!_chargedParticles) {
    _chargedParticles = new ChargedParticles(id);
    const boundChargedParticles = ChargedParticlesContract.bind(chargedParticlesAddress);

    _chargedParticles.owner = boundChargedParticles.owner();
    _chargedParticles.save();
  }

  return _chargedParticles as ChargedParticles;
}
