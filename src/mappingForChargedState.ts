import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  ChargedSettingsSet,
  DischargeApproval,
  ReleaseApproval,
  BreakBondApproval,
  TimelockApproval,
  TokenDischargeTimelock,
  TokenReleaseTimelock,
  TokenBreakBondTimelock,
  TokenTempLock,
  PermsSetForRestrictCharge,
  PermsSetForAllowDischarge,
  PermsSetForAllowRelease,
  PermsSetForRestrictBond,
  PermsSetForAllowBreakBond,
} from '../generated/ChargedState/ChargedState';


import { loadOrCreateChargedState } from './helpers/loadOrCreateChargedState';
import { loadOrCreateNftState } from './helpers/loadOrCreateNftState';
import { trackLastKnownOwner } from './helpers/nftState';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _chargedState = loadOrCreateChargedState(event.address);
  _chargedState.owner = event.params.newOwner;
  _chargedState.save();
}

export function handleChargedSettingsSet(event: ChargedSettingsSet): void {
  // no-op
}

export function handleDischargeApproval(event: DischargeApproval): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  trackLastKnownOwner(_nftState, event.params.owner);
  _nftState.dischargeApproval = event.params.operator;
  _nftState.save();
}

export function handleReleaseApproval(event: ReleaseApproval): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  trackLastKnownOwner(_nftState, event.params.owner);
  _nftState.releaseApproval = event.params.operator;
  _nftState.save();
}

export function handleBreakBondApproval(event: BreakBondApproval): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  trackLastKnownOwner(_nftState, event.params.owner);
  _nftState.breakBondApproval = event.params.operator;
  _nftState.save();
}

export function handleTimelockApproval(event: TimelockApproval): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  trackLastKnownOwner(_nftState, event.params.owner);
  _nftState.timelockApproval = event.params.operator;
  _nftState.save();
}

export function handleTokenDischargeTimelock(event: TokenDischargeTimelock): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _nftState.dischargeTimelockExpiry = event.params.unlockBlock;
  _nftState.dischargeTimelockLockedBy = event.params.operator;
  _nftState.save();
}

export function handleTokenReleaseTimelock(event: TokenReleaseTimelock): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _nftState.releaseTimelockExpiry = event.params.unlockBlock;
  _nftState.releaseTimelockLockedBy = event.params.operator;
  _nftState.save();
}

export function handleTokenBreakBondTimelock(event: TokenBreakBondTimelock): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _nftState.breakBondTimelockExpiry = event.params.unlockBlock;
  _nftState.breakBondTimelockLockedBy = event.params.operator;
  _nftState.save();
}

export function handleTokenTempLock(event: TokenTempLock): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _nftState.tempLockExpiry = event.params.unlockBlock;
  _nftState.save();
}

export function handlePermsSetForRestrictCharge(event: PermsSetForRestrictCharge): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _nftState.restrictChargeFromAny = event.params.state;
  _nftState.save();
}

export function handlePermsSetForAllowDischarge(event: PermsSetForAllowDischarge): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _nftState.allowDischargeFromAny = event.params.state;
  _nftState.save();
}

export function handlePermsSetForAllowRelease(event: PermsSetForAllowRelease): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _nftState.allowReleaseFromAny = event.params.state;
  _nftState.save();
}

export function handlePermsSetForRestrictBond(event: PermsSetForRestrictBond): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _nftState.restrictBondFromAny = event.params.state;
  _nftState.save();
}

export function handlePermsSetForAllowBreakBond(event: PermsSetForAllowBreakBond): void {
  const _nftState = loadOrCreateNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _nftState.allowBreakBondFromAny = event.params.state;
  _nftState.save();
}
