import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ChargedSettings,
} from '../../generated/schema';

import {
  ChargedSettings as ChargedSettingsContract,
} from '../../generated/ChargedSettings/ChargedSettings';


export function loadOrCreateChargedSettings(
  chargedSettingsAddress: Address
): ChargedSettings {
  const id = chargedSettingsAddress.toHex();
  let _chargedSettings = ChargedSettings.load(id);

  if (!_chargedSettings) {
    _chargedSettings = new ChargedSettings(id);
    const boundChargedSettings = ChargedSettingsContract.bind(chargedSettingsAddress);

    _chargedSettings.owner = boundChargedSettings.owner();
    _chargedSettings.tempLockExpiryBlocks = boundChargedSettings.getTempLockExpiryBlocks();
    _chargedSettings.save();
  }

  return _chargedSettings as ChargedSettings;
}
