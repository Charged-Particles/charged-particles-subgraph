import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Lepton,
} from '../../generated/schema';

import {
  Lepton as LeptonContract,
} from '../../generated/Lepton/Lepton';


export function loadOrCreateLepton(
  leptonAddress: Address
): Lepton {
  const id = leptonAddress.toHex();
  let _lepton = Lepton.load(id);

  if (!_lepton) {
    _lepton = new Lepton(id);
    const boundLepton = LeptonContract.bind(leptonAddress);
    _lepton.owner = boundLepton.owner();
    _lepton.save();
  }

  return _lepton as Lepton;
}
