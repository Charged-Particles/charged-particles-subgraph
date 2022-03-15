import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GlobalData,
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
    const _global = new GlobalData('V1');
    _global.chargedParticlesAddress = chargedParticlesAddress;
    _global.save();

    _chargedParticles = new ChargedParticles(id);
    const boundChargedParticles = ChargedParticlesContract.bind(chargedParticlesAddress);

    _chargedParticles.owner = boundChargedParticles.owner();
    _chargedParticles.save();
  }

  return _chargedParticles as ChargedParticles;
}
