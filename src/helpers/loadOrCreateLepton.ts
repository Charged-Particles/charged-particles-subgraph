import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Lepton,
} from '../../generated/schema';

import {
  Lepton as LeptonContract,
} from '../../generated/Lepton/Lepton';

import { ZERO } from './common';

export function loadOrCreateLepton(
  leptonAddress: Address
): Lepton {
  const id = leptonAddress.toHex();
  let _lepton = Lepton.load(id);

  if (!_lepton) {
    _lepton = new Lepton(id);
    const boundLepton = LeptonContract.bind(leptonAddress);
    _lepton.owner = boundLepton.owner();
    _lepton.typeIndex = ZERO;
    _lepton.maxSupply = ZERO;
    _lepton.totalMinted = ZERO;
    _lepton.save();
  }

  return _lepton as Lepton;
}
