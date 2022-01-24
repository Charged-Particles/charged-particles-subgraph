import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  ControllerSet,
  DepositFeeSet,
  ProtocolFeesCollected,
} from '../generated/ChargedParticles/ChargedParticles';

import { loadOrCreateChargedParticles } from './helpers/loadOrCreateChargedParticles';

// import { loadOrCreateExternalContractSettings } from './helpers/loadOrCreateExternalContractSettings';
// import { loadOrCreateNftCreatorSettings } from './helpers/loadOrCreateNftCreatorSettings';
// import { loadOrCreateChargedNftState } from './helpers/loadOrCreateChargedNftState';
// import { loadOrCreateWhitelistedNftContract } from './helpers/loadOrCreateWhitelistedNftContract';

// import { trackNftTxHistory } from './helpers/trackNftTxHistory';
// import { trackLastKnownOwner } from './helpers/nftState';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  _chargedParticles.owner = event.params.newOwner;
  _chargedParticles.save();
}

export function handleControllerSetSet(event: ControllerSet): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  if (event.controllerId === 'universe') {
   _chargedParticles.universe = event.params.controller.toHex();
  }
  if (event.controllerId === 'settings') {
   _chargedParticles.chargedSettings = event.params.controller.toHex();
  }
  if (event.controllerId === 'state') {
   _chargedParticles.chargedState = event.params.controller.toHex();
  }
  if (event.controllerId === 'managers') {
   _chargedParticles.chargedManagers = event.params.controller.toHex();
  }
  if (event.controllerId === 'leptons') {
   _chargedParticles.leptonToken = event.params.controller.toHex();
  }
  if (event.controllerId === 'forwarder') {
   _chargedParticles.trustedForwarder = event.params.controller.toHex();
  }
  if (event.controllerId === 'tokeninfo') {
   _chargedParticles.tokenInfoProxy = event.params.controller.toHex();
  }
  _chargedParticles.save();
}

export function handleDepositFeeSet(event: DepositFeeSet): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  _chargedParticles.depositFee = event.params.depositFee;
  _chargedParticles.save();
}

export function handleProtocolFeesCollected(event: ProtocolFeesCollected): void {
  // no-op
}


// export function handleLiquidityProviderRegistered(event: LiquidityProviderRegistered): void {
//   // no-op
// }

// export function handleTokenContractConfigsSet(event: TokenContractConfigsSet): void {
//   const _externalContractSettings = loadOrCreateExternalContractSettings(event.address, event.params.contractAddress);
//   _externalContractSettings.liquidityProvider = event.params.liquidityProvider;
//   _externalContractSettings.assetDepositMin = event.params.assetDepositMin;
//   _externalContractSettings.assetDepositMax = event.params.assetDepositMax;
//   _externalContractSettings.save();
// }

// export function handleTokenCreatorConfigsSet(event: TokenCreatorConfigsSet): void {
//   const _nftCreatorSettings = loadOrCreateNftCreatorSettings(
//     event.address,
//     event.params.contractAddress,
//     event.params.tokenId,
//     event.params.creatorAddress
//   );
//   _nftCreatorSettings.annuityPercent = event.params.annuityPercent;
//   _nftCreatorSettings.save();

//   var eventData = new Array<string>(4);
//   eventData[0] = event.params.contractAddress.toHex();
//   eventData[1] = event.params.tokenId.toString();
//   eventData[2] = event.params.creatorAddress.toHex();
//   eventData[3] = event.params.annuityPercent.toString();
//   trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'TokenCreatorConfigsSet', eventData.join('-'));
// }
