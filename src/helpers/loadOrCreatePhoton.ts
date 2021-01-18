import { Address } from '@graphprotocol/graph-ts';

import {
  Photon,
} from '../../generated/schema';

import { photonId } from './idTemplates';

export function loadOrCreatePhoton(
  photonAddress: Address,
  accountAddress: Address
): Photon {
  const id = photonId(photonAddress.toHex(), accountAddress.toHex());
  let _photon = Photon.load(id);

  if (!_photon) {
    _photon = new Photon(id);
    _photon.proton = photonAddress.toHex();
    _photon.account = accountAddress.toHex();
    _photon.save();
  }

  return _photon as Photon;
}
