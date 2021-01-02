import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  UniverseSet,
  LiquidityProviderRegistered,
  TokenContractConfigsSet,
  TokenCreatorConfigsSet,
  DischargeApproval,
  ReleaseApproval,
  TimelockApproval,
  TokenDischargeTimelock,
  TokenReleaseTimelock,
  UpdateContractWhitelist,
} from '../generated/ChargedParticles/ChargedParticles';

import { loadOrCreateChargedParticles } from './helpers/loadOrCreateChargedParticles';
import { loadOrCreateExternalContractSettings } from './helpers/loadOrCreateExternalContractSettings';
import { loadOrCreateNftCreatorSettings } from './helpers/loadOrCreateNftCreatorSettings';
import { loadOrCreateChargedNftState } from './helpers/loadOrCreateChargedNftState';
import { loadOrCreateWhitelistedNftContract } from './helpers/loadOrCreateWhitelistedNftContract';

import { trackNftTxHistory } from './helpers/trackNftTxHistory';
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

export function handleLiquidityProviderRegistered(event: LiquidityProviderRegistered): void {
  // no-op
}

export function handleTokenContractConfigsSet(event: TokenContractConfigsSet): void {
  const _externalContractSettings = loadOrCreateExternalContractSettings(event.address, event.params.contractAddress);
  _externalContractSettings.liquidityProvider = event.params.liquidityProvider;
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
  _nftCreatorSettings.save();

  var eventData = new Array<string>(4);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.creatorAddress.toHex();
  eventData[3] = event.params.annuityPercent.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'TokenCreatorConfigsSet', eventData.join('-'));
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

export function handleUpdateContractWhitelist(event: UpdateContractWhitelist): void {
  const _whitelistedNftContract = loadOrCreateWhitelistedNftContract(event.address, event.params.contractAddress);
  _whitelistedNftContract.state = event.params.state;
  _whitelistedNftContract.save();
}
