import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ChargedManagers,
} from '../../generated/schema';

import {
  ChargedManagers as ChargedManagersContract,
} from '../../generated/ChargedManagers/ChargedManagers';


export function loadOrCreateChargedManagers(
  chargedManagersAddress: Address
): ChargedManagers {
  const id = chargedManagersAddress.toHex();
  let _chargedManagers = ChargedManagers.load(id);

  if (!_chargedManagers) {
    _chargedManagers = new ChargedManagers(id);
    const boundChargedManagers = ChargedManagersContract.bind(chargedManagersAddress);

    _chargedManagers.owner = boundChargedManagers.owner();
    _chargedManagers.save();
  }

  return _chargedManagers as ChargedManagers;
}
