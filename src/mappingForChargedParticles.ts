import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  UniverseSet,
  DepositFeeSet,
  LiquidityProviderRegistered,
  TokenContractConfigsSet,
  TokenCreatorConfigsSet,
  DischargeApproval,
  ReleaseApproval,
  TimelockApproval,
  TokenDischargeTimelock,
  TokenReleaseTimelock,
  FeesWithdrawn,
  UpdateContractWhitelist,
} from '../generated/ChargedParticles/ChargedParticles';

import { loadOrCreateChargedParticles } from './helpers/loadOrCreateChargedParticles';
import { loadOrCreateExternalContractSettings } from './helpers/loadOrCreateExternalContractSettings';
import { loadOrCreateNftCreatorSettings } from './helpers/loadOrCreateNftCreatorSettings';
import { loadOrCreateChargedNftState } from './helpers/loadOrCreateChargedNftState';
import { loadOrCreateWhitelistedNftContract } from './helpers/loadOrCreateWhitelistedNftContract';

import { trackLastKnownOwner } from './helpers/nftState';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  _chargedParticles.owner = event.params.newOwner;
  _chargedParticles.save();
}

export function handleUniverseSet(event: UniverseSet): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  _chargedParticles.universe = event.params.universeAddress.toHex();
  _chargedParticles.save();
}

export function handleDepositFeeSet(event: DepositFeeSet): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  _chargedParticles.depositFee = event.params.depositFee;
  _chargedParticles.save();
}

export function handleLiquidityProviderRegistered(event: LiquidityProviderRegistered): void {
  // no-op
}

export function handleTokenContractConfigsSet(event: TokenContractConfigsSet): void {
  const _externalContractSettings = loadOrCreateExternalContractSettings(event.address, event.params.contractAddress);
  _externalContractSettings.liquidityProvider = event.params.liquidityProvider;
  _externalContractSettings.assetDepositFee = event.params.assetDepositFee;
  _externalContractSettings.assetDepositMin = event.params.assetDepositMin;
  _externalContractSettings.assetDepositMax = event.params.assetDepositMax;
  _externalContractSettings.save();
}

export function handleTokenCreatorConfigsSet(event: TokenCreatorConfigsSet): void {
  const _nftCreatorSettings = loadOrCreateNftCreatorSettings(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
    event.params.creatorAddress
  );
  _nftCreatorSettings.annuityPercent = event.params.annuityPercent;
  _nftCreatorSettings.burnToRelease = event.params.burnToRelease;
  _nftCreatorSettings.save();
}

export function handleDischargeApproval(event: DischargeApproval): void {
  const _chargedNftState = loadOrCreateChargedNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  trackLastKnownOwner(_chargedNftState, event.params.owner);
  _chargedNftState.dischargeApproval = event.params.operator;
  _chargedNftState.save();
}

export function handleReleaseApproval(event: ReleaseApproval): void {
  const _chargedNftState = loadOrCreateChargedNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  trackLastKnownOwner(_chargedNftState, event.params.owner);
  _chargedNftState.releaseApproval = event.params.operator;
  _chargedNftState.save();
}

export function handleTimelockApproval(event: TimelockApproval): void {
  const _chargedNftState = loadOrCreateChargedNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  trackLastKnownOwner(_chargedNftState, event.params.owner);
  _chargedNftState.timelockApproval = event.params.operator;
  _chargedNftState.save();
}

export function handleTokenDischargeTimelock(event: TokenDischargeTimelock): void {
  const _chargedNftState = loadOrCreateChargedNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _chargedNftState.dischargeTimelock = event.params.unlockBlock;
  _chargedNftState.save();
}

export function handleTokenReleaseTimelock(event: TokenReleaseTimelock): void {
  const _chargedNftState = loadOrCreateChargedNftState(
    event.address,
    event.params.contractAddress,
    event.params.tokenId,
  );
  _chargedNftState.releaseTimelock = event.params.unlockBlock;
  _chargedNftState.save();
}

export function handleFeesWithdrawn(event: FeesWithdrawn): void {
  log.info('TODO: handleFeesWithdrawn', []);
}

export function handleUpdateContractWhitelist(event: UpdateContractWhitelist): void {
  const _whitelistedNftContract = loadOrCreateWhitelistedNftContract(event.address, event.params.contractAddress);
  _whitelistedNftContract.state = event.params.state;
  _whitelistedNftContract.save();
}
