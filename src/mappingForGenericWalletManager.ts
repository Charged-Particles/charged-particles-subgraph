import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  ControllerSet,
  PausedStateSet,
  NewSmartWallet,
  WalletEnergized,
  WalletReleased,
  WalletRewarded,
} from '../generated/GenericWalletManager/GenericWalletManager';

import { loadOrCreateChargedParticles } from './helpers/loadOrCreateChargedParticles';
import { loadOrCreateGenericWalletManager } from './helpers/loadOrCreateGenericWalletManager';
import { loadOrCreateGenericSmartWallet } from './helpers/loadOrCreateGenericSmartWallet';
import { loadOrCreateGenericAssetTokenBalance } from './helpers/loadOrCreateGenericAssetTokenBalance';
import { trackNftTxHistory } from './helpers/trackNftTxHistory';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const genericWalletManager = loadOrCreateGenericWalletManager(event.address);
  genericWalletManager.owner = event.params.newOwner;
  genericWalletManager.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const genericWalletManager = loadOrCreateGenericWalletManager(event.address);
  genericWalletManager.chargedParticles = event.params.controller;
  genericWalletManager.save();
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const genericWalletManager = loadOrCreateGenericWalletManager(event.address);
  genericWalletManager.paused = event.params.isPaused;
  genericWalletManager.save();
}

export function handleNewSmartWallet(event: NewSmartWallet): void {
  const genericWalletManager = loadOrCreateGenericWalletManager(event.address);
  const genericSmartWallet = loadOrCreateGenericSmartWallet(event.params.contractAddress, event.params.tokenId);
  genericSmartWallet.address = event.params.smartWallet;
  genericSmartWallet.walletManager = genericWalletManager.id;
  genericSmartWallet.save();
}

export function handleWalletEnergized(event: WalletEnergized): void {
  const genericSmartWallet = loadOrCreateGenericSmartWallet(event.params.contractAddress, event.params.tokenId);
  if (!genericSmartWallet.assetTokens.includes(event.params.assetToken)) {
    genericSmartWallet.assetTokens.push(event.params.assetToken);
  }
  genericSmartWallet.save();

  const assetTokenBalance = loadOrCreateGenericAssetTokenBalance(genericSmartWallet.id, event.params.assetToken, event.params.contractAddress, event.params.tokenId);
  assetTokenBalance.principal = assetTokenBalance.principal.plus(event.params.assetAmount);
  assetTokenBalance.save();

  var eventData = new Array<string>(5);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.assetToken.toHex();
  eventData[3] = event.params.assetAmount.toString();
  eventData[4] = event.params.yieldTokensAmount.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'WalletEnergized', eventData.join('-'));
}

export function handleWalletReleased(event: WalletReleased): void {
  const genericSmartWallet = loadOrCreateGenericSmartWallet(event.params.contractAddress, event.params.tokenId);
  const assetTokenBalance = loadOrCreateGenericAssetTokenBalance(genericSmartWallet.id, event.params.assetToken, event.params.contractAddress, event.params.tokenId);
  assetTokenBalance.principal = assetTokenBalance.principal.minus(event.params.principalAmount);
  assetTokenBalance.save();

  var eventData = new Array<string>(7);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.receiver.toHex();
  eventData[3] = event.params.assetToken.toHex();
  eventData[4] = event.params.principalAmount.toString();
  eventData[5] = event.params.creatorAmount.toString();
  eventData[6] = event.params.receiverAmount.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'WalletReleased', eventData.join('-'));
}

export function handleWalletRewarded(event: WalletRewarded): void {
  var eventData = new Array<string>(5);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.receiver.toHex();
  eventData[3] = event.params.rewardsToken.toHex();
  eventData[4] = event.params.rewardsAmount.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'WalletRewarded', eventData.join('-'));
}
