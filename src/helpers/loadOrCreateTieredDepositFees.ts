import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  TieredDepositFees,
} from '../../generated/schema';

import { tieredDepositFeeId } from './idTemplates';


export function loadOrCreateTieredDepositFees(
  chargedParticlesAddress: Address,
  limit: BigInt,
): TieredDepositFees {
  const id = tieredDepositFeeId(chargedParticlesAddress.toHex(), limit.toString());
  let _tieredDepositFees = TieredDepositFees.load(id);

  if (!_tieredDepositFees) {
    _tieredDepositFees = new TieredDepositFees(id);
    _tieredDepositFees.chargedParticles = chargedParticlesAddress.toHex();
    _tieredDepositFees.limit = limit;
    _tieredDepositFees.save();
  }

  return _tieredDepositFees as TieredDepositFees;
}
