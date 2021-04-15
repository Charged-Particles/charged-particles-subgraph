import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  AaveBridgeSet,
  ControllerSet,
  PausedStateSet,
  NewSmartWallet,
  WalletEnergized,
  WalletDischarged,
  WalletDischargedForCreator,
  WalletReleased,
  WalletRewarded,
} from '../generated/AaveWalletManager/AaveWalletManager';

import {
  Proton as ProtonContract
} from '../generated/Proton/Proton';

import { loadOrCreateChargedParticles } from './helpers/loadOrCreateChargedParticles';
import { loadOrCreateAaveWalletManager } from './helpers/loadOrCreateAaveWalletManager';
import { loadOrCreateAaveSmartWallet } from './helpers/loadOrCreateAaveSmartWallet';
import { loadOrCreateAaveAssetTokenBalance } from './helpers/loadOrCreateAaveAssetTokenBalance';
import { trackNftTxHistory } from './helpers/trackNftTxHistory';
import { loadOrCreateAssetTokenAnalytics } from './helpers/loadOrCreateAssetTokenAnalytics'
import { loadOrCreateProfileMetric } from './helpers/loadOrCreateProfileMetric';
import { loadOrCreateUserTokenMetric } from './helpers/loadOrCreateUserTokenMetric';
import { ONE } from './helpers/common';

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  aaveWalletManager.owner = event.params.newOwner;
  aaveWalletManager.save();
}

export function handleAaveBridgeSet(event: AaveBridgeSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  aaveWalletManager.aaveBridge = event.params.aaveBridge;
  aaveWalletManager.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  aaveWalletManager.chargedParticles = event.params.controller;
  aaveWalletManager.save();
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  aaveWalletManager.paused = event.params.isPaused;
  aaveWalletManager.save();
}

export function handleNewSmartWallet(event: NewSmartWallet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.contractAddress, event.params.tokenId);
  aaveSmartWallet.address = event.params.smartWallet;
  aaveSmartWallet.walletManager = aaveWalletManager.id;
  aaveSmartWallet.nftCreator = event.params.creator;
  aaveSmartWallet.nftCreatorAnnuityPct = event.params.annuityPct;
  aaveSmartWallet.save();
}

export function handleWalletEnergized(event: WalletEnergized): void {
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.contractAddress, event.params.tokenId);
  if (!aaveSmartWallet.assetTokens.includes(event.params.assetToken)) {
    let assetTokens = aaveSmartWallet.assetTokens;
    assetTokens.push(event.params.assetToken);
    aaveSmartWallet.assetTokens = assetTokens;
  }
  aaveSmartWallet.save();

  const assetTokenBalance = loadOrCreateAaveAssetTokenBalance(aaveSmartWallet.id, event.params.assetToken, event.params.contractAddress, event.params.tokenId);
  assetTokenBalance.principal = assetTokenBalance.principal.plus(event.params.assetAmount);
  assetTokenBalance.save();

  const assetTokenAnalytics = loadOrCreateAssetTokenAnalytics(event.params.assetToken);
  assetTokenAnalytics.totalAssetsLocked = assetTokenAnalytics.totalAssetsLocked.plus(event.params.assetAmount);
  assetTokenAnalytics.totalAssetsLockedAave = assetTokenAnalytics.totalAssetsLockedAave.plus(event.params.assetAmount);
  assetTokenAnalytics.save();

  const boundProton = ProtonContract.bind(event.params.contractAddress);
  const _walletOwner = loadOrCreateProfileMetric(boundProton.ownerOf(event.params.tokenId));
  _walletOwner.energizeAaveCount = _walletOwner.energizeAaveCount.plus(ONE);
  _walletOwner.save();

  const userTokenMetric = loadOrCreateUserTokenMetric(boundProton.ownerOf(event.params.tokenId), event.params.assetToken);
  userTokenMetric.lifetimeValueLocked = userTokenMetric.lifetimeValueLocked.plus(event.params.assetAmount);
  userTokenMetric.save();

  var eventData = new Array<string>(5);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.assetToken.toHex();
  eventData[3] = event.params.assetAmount.toString();
  eventData[4] = event.params.yieldTokensAmount.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'WalletEnergized', eventData.join('-'));
}

export function handleWalletDischarged(event: WalletDischarged): void {
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.contractAddress, event.params.tokenId);
  const assetTokenBalance = loadOrCreateAaveAssetTokenBalance(aaveSmartWallet.id, event.params.assetToken, event.params.contractAddress, event.params.tokenId);
  assetTokenBalance.ownerInterestDischarged = assetTokenBalance.ownerInterestDischarged.plus(event.params.receiverAmount);
  assetTokenBalance.creatorInterestDischarged = assetTokenBalance.creatorInterestDischarged.plus(event.params.creatorAmount);
  assetTokenBalance.save();

  const boundProton = ProtonContract.bind(event.params.contractAddress);
  const _walletOwner = loadOrCreateProfileMetric(boundProton.ownerOf(event.params.tokenId));
  _walletOwner.dischargeInterestCount = _walletOwner.dischargeInterestCount.plus(ONE);
  _walletOwner.save();

  const userTokenMetric = loadOrCreateUserTokenMetric(boundProton.ownerOf(event.params.tokenId), event.params.assetToken);
  userTokenMetric.totalInterestDischarged = userTokenMetric.totalInterestDischarged.plus(event.params.receiverAmount);
  userTokenMetric.save();

  const creatorTokenMetric = loadOrCreateUserTokenMetric(boundProton.creatorOf(event.params.tokenId), event.params.assetToken);
  creatorTokenMetric.totalInterestDischarged = creatorTokenMetric.totalInterestDischarged.plus(event.params.creatorAmount);
  creatorTokenMetric.save();

  var eventData = new Array<string>(5);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.assetToken.toHex();
  eventData[3] = event.params.creatorAmount.toString();
  eventData[4] = event.params.receiverAmount.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'WalletDischarged', eventData.join('-'));
}

export function handleWalletDischargedForCreator(event: WalletDischargedForCreator): void {
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.contractAddress, event.params.tokenId);
  const assetTokenBalance = loadOrCreateAaveAssetTokenBalance(aaveSmartWallet.id, event.params.assetToken, event.params.contractAddress, event.params.tokenId);
  assetTokenBalance.creatorInterestDischarged = assetTokenBalance.creatorInterestDischarged.plus(event.params.receiverAmount);
  assetTokenBalance.save();

  const boundProton = ProtonContract.bind(event.params.contractAddress);
  const creatorTokenMetric = loadOrCreateUserTokenMetric(boundProton.creatorOf(event.params.tokenId), event.params.assetToken);
  creatorTokenMetric.totalInterestDischarged = creatorTokenMetric.totalInterestDischarged.plus(event.params.receiverAmount);
  creatorTokenMetric.save();

  var eventData = new Array<string>(4);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.assetToken.toHex();
  eventData[3] = event.params.receiverAmount.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'WalletDischargedForCreator', eventData.join('-'));
}

export function handleWalletReleased(event: WalletReleased): void {
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.contractAddress, event.params.tokenId);
  const assetTokenBalance = loadOrCreateAaveAssetTokenBalance(aaveSmartWallet.id, event.params.assetToken, event.params.contractAddress, event.params.tokenId);
  const ownerInterest = event.params.receiverAmount.minus(event.params.principalAmount);
  assetTokenBalance.principal = assetTokenBalance.principal.minus(event.params.principalAmount);
  assetTokenBalance.ownerInterestDischarged = assetTokenBalance.ownerInterestDischarged.plus(ownerInterest);
  assetTokenBalance.creatorInterestDischarged = assetTokenBalance.creatorInterestDischarged.plus(event.params.creatorAmount);
  assetTokenBalance.save();

  const assetTokenAnalytics = loadOrCreateAssetTokenAnalytics(event.params.assetToken);
  assetTokenAnalytics.totalAssetsLocked = assetTokenAnalytics.totalAssetsLocked.minus(event.params.principalAmount);
  assetTokenAnalytics.totalAssetsLockedAave = assetTokenAnalytics.totalAssetsLockedAave.minus(event.params.principalAmount);
  assetTokenAnalytics.save();

  const boundProton = ProtonContract.bind(event.params.contractAddress);
  const _walletOwner = loadOrCreateProfileMetric(boundProton.ownerOf(event.params.tokenId));
  _walletOwner.releaseMassCount = _walletOwner.releaseMassCount.plus(ONE);
  _walletOwner.save();

  const userTokenMetric = loadOrCreateUserTokenMetric(boundProton.ownerOf(event.params.tokenId), event.params.assetToken);
  userTokenMetric.totalInterestDischarged = userTokenMetric.totalInterestDischarged.plus(ownerInterest);
  userTokenMetric.totalMassReleased = userTokenMetric.totalMassReleased.plus(event.params.principalAmount)
  userTokenMetric.save();

  const creatorTokenMetric = loadOrCreateUserTokenMetric(boundProton.creatorOf(event.params.tokenId), event.params.assetToken);
  creatorTokenMetric.totalInterestDischarged = creatorTokenMetric.totalInterestDischarged.plus(event.params.creatorAmount);
  creatorTokenMetric.save();

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
