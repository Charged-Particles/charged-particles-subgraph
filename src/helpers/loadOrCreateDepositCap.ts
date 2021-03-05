import { Address } from '@graphprotocol/graph-ts';

import {
  DepositCap
} from '../../generated/schema';

import { depositCapId } from './idTemplates';

import { ZERO } from './common';

export function loadOrCreateDepositCap(
  chargedSettingsAddress: Address,
  assetTokenAddress: Address,
): DepositCap {
  const id = depositCapId(chargedSettingsAddress.toHex(), assetTokenAddress.toHex());
  let _depositCap = DepositCap.load(id);


  if (!_depositCap) {
    _depositCap = new DepositCap(id);
    _depositCap.chargedSettings = chargedSettingsAddress.toHex();
    _depositCap.assetToken = assetTokenAddress;
    _depositCap.maxDeposit = ZERO;
    _depositCap.save();
  }

  return  _depositCap as DepositCap;
}
