import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Lepton2,
} from '../../generated/schema';

import {
  Lepton2 as Lepton2Contract,
} from '../../generated/Lepton2/Lepton2';

import { ZERO } from './common';

export function loadOrCreateLepton2(
  leptonAddress: Address
): Lepton2 {
  const id = leptonAddress.toHex();
  let _lepton = Lepton2.load(id);

  if (!_lepton) {
    _lepton = new Lepton2(id);
    const boundLepton = Lepton2Contract.bind(leptonAddress);
    _lepton.owner = boundLepton.owner();
    _lepton.typeIndex = ZERO;
    _lepton.maxSupply = ZERO;
    _lepton.totalMinted = ZERO;
    _lepton.save();
  }

  return _lepton as Lepton2;
}
