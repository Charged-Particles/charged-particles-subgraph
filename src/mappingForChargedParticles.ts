import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  UniverseSet,
  ChargedStateSet,
  ChargedSettingsSet,
  LeptonTokenSet,
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

export function handleUniverseSet(event: UniverseSet): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  _chargedParticles.universe = event.params.universeAddress.toHex();
  _chargedParticles.save();
}

export function handleChargedStateSet(event: ChargedStateSet): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  _chargedParticles.chargedState = event.params.chargedState.toHex();
  _chargedParticles.save();
}

export function handleChargedSettingsSet(event: ChargedSettingsSet): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  _chargedParticles.chargedSettings = event.params.chargedSettings.toHex();
  _chargedParticles.save();
}

export function handleLeptonTokenSet(event: LeptonTokenSet): void {
  const _chargedParticles = loadOrCreateChargedParticles(event.address);
  _chargedParticles.leptonToken = event.params.leptonToken.toHex();
  _chargedParticles.save();
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
