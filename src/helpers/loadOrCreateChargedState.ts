import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ChargedState,
} from '../../generated/schema';

import {
  ChargedState as ChargedStateContract,
} from '../../generated/ChargedState/ChargedState';


export function loadOrCreateChargedState(
  chargedStateAddress: Address
): ChargedState {
  const id = chargedStateAddress.toHex();
  let _chargedState = ChargedState.load(id);

  if (!_chargedState) {
    _chargedState = new ChargedState(id);
    const boundChargedState = ChargedStateContract.bind(chargedStateAddress);

    _chargedState.owner = boundChargedState.owner();
    _chargedState.save();
  }

  return _chargedState as ChargedState;
}
