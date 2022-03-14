import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  AaveBridgeSet,
  ControllerSet,
  ExecutorSet,
  PausedStateSet,
  NewSmartWallet,
  WalletEnergized,
  WalletDischarged,
  WalletDischargedForCreator,
  WalletReleased,
  WalletRewarded,
} from '../generated/AaveWalletManagerB/AaveWalletManagerB';

import {
  getProtonOwnerOf,
  getProtonCreatorOf,
} from './helpers/common';

import { loadOrCreateAaveWalletManager } from './helpers/loadOrCreateAaveWalletManager';
import { loadOrCreateAaveSmartWallet } from './helpers/loadOrCreateAaveSmartWallet';
import { loadOrCreateAaveAssetTokenBalance } from './helpers/loadOrCreateAaveAssetTokenBalance';
import { trackNftTxHistory } from './helpers/trackNftTxHistory';
import { loadOrCreateAssetTokenAnalytics } from './helpers/loadOrCreateAssetTokenAnalytics'
import { loadOrCreateProfileMetric } from './helpers/loadOrCreateProfileMetric';
import { loadOrCreateUserTokenMetric } from './helpers/loadOrCreateUserTokenMetric';
import { ONE } from './helpers/common';
import { loadOrCreatePlatformMetric } from './helpers/loadOrCreatePlatformMetric';

const _contractVersionFlag = 'B';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address, _contractVersionFlag);
  aaveWalletManager.owner = event.params.newOwner;
  aaveWalletManager.save();
}

export function handleAaveBridgeSet(event: AaveBridgeSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address, _contractVersionFlag);
  aaveWalletManager.aaveBridge = event.params.aaveBridge;
  aaveWalletManager.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address, _contractVersionFlag);
  aaveWalletManager.chargedParticles = event.params.controller;
  aaveWalletManager.save();
}

export function handleExecutorSet(event: ExecutorSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address, _contractVersionFlag);
  aaveWalletManager.executor = event.params.executor;
  aaveWalletManager.save();
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address, _contractVersionFlag);
  aaveWalletManager.paused = event.params.isPaused;
  aaveWalletManager.save();
}

export function handleNewSmartWallet(event: NewSmartWallet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address, _contractVersionFlag);
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.contractAddress, event.params.tokenId);
  aaveSmartWallet.address = event.params.smartWallet;
  aaveSmartWallet.walletManager = aaveWalletManager.id;
  aaveSmartWallet.managerId = "aave.B";
  // aaveSmartWallet.nftCreator = event.params.creator;
  // aaveSmartWallet.nftCreatorAnnuityPct = event.params.annuityPct;
  aaveSmartWallet.save();
}

export function handleWalletEnergized(event: WalletEnergized): void {
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.contractAddress, event.params.tokenId);
  let assetTokens = aaveSmartWallet.assetTokens;
  if (assetTokens) {
    if (!assetTokens.includes(event.params.assetToken)) {
      assetTokens.push(event.params.assetToken);
    }
  } else {
    assetTokens = [event.params.assetToken];
  }
  aaveSmartWallet.assetTokens = assetTokens;
  aaveSmartWallet.save();

  const assetTokenBalance = loadOrCreateAaveAssetTokenBalance(aaveSmartWallet.id, event.params.assetToken, event.params.contractAddress, event.params.tokenId);
  assetTokenBalance.principal = assetTokenBalance.principal.plus(event.params.assetAmount);
  assetTokenBalance.save();

  const assetTokenAnalytics = loadOrCreateAssetTokenAnalytics(event.params.assetToken);
  assetTokenAnalytics.totalAssetsLocked = assetTokenAnalytics.totalAssetsLocked.plus(event.params.assetAmount);
  assetTokenAnalytics.totalAssetsLockedAave = assetTokenAnalytics.totalAssetsLockedAave.plus(event.params.assetAmount);
  assetTokenAnalytics.save();

  let tokenOwner = getProtonOwnerOf(event.params.contractAddress, event.params.tokenId);
  if (tokenOwner != Address.zero()) {
    const _walletOwner = loadOrCreateProfileMetric(tokenOwner);
    _walletOwner.energizeAaveCount = _walletOwner.energizeAaveCount.plus(ONE);
    _walletOwner.save();

    const userTokenMetric = loadOrCreateUserTokenMetric(tokenOwner, event.params.assetToken);
    userTokenMetric.lifetimeValueLocked = userTokenMetric.lifetimeValueLocked.plus(event.params.assetAmount);
    userTokenMetric.save();
  }

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

  const _platformMetric = loadOrCreatePlatformMetric(event.params.contractAddress);
  let tokenOwner = getProtonOwnerOf(event.params.contractAddress, event.params.tokenId);
  if (tokenOwner != Address.zero()) {
    const _walletOwner = loadOrCreateProfileMetric(tokenOwner);
    _walletOwner.dischargeInterestCount = _walletOwner.dischargeInterestCount.plus(ONE);
    _walletOwner.save();

    const userTokenMetric = loadOrCreateUserTokenMetric(tokenOwner, event.params.assetToken);
    userTokenMetric.totalInterestDischarged = userTokenMetric.totalInterestDischarged.plus(event.params.receiverAmount);
    _platformMetric.platformInterestDischarged = _platformMetric.platformInterestDischarged.plus(event.params.receiverAmount);
    userTokenMetric.save();
  }

  let tokenCreator = getProtonCreatorOf(event.params.contractAddress, event.params.tokenId);
  if (tokenCreator != Address.zero()) {
    const creatorTokenMetric = loadOrCreateUserTokenMetric(tokenCreator, event.params.assetToken);
    creatorTokenMetric.totalInterestDischarged = creatorTokenMetric.totalInterestDischarged.plus(event.params.creatorAmount);
    _platformMetric.platformInterestDischarged = _platformMetric.platformInterestDischarged.plus(event.params.creatorAmount);
    creatorTokenMetric.save();
  }
  _platformMetric.save();

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

  const _platformMetric = loadOrCreatePlatformMetric(event.params.contractAddress);
  let tokenCreator = getProtonCreatorOf(event.params.contractAddress, event.params.tokenId);
  if (tokenCreator != Address.zero()) {
    const creatorTokenMetric = loadOrCreateUserTokenMetric(tokenCreator, event.params.assetToken);
    creatorTokenMetric.totalInterestDischarged = creatorTokenMetric.totalInterestDischarged.plus(event.params.receiverAmount);
    _platformMetric.platformInterestDischarged = _platformMetric.platformInterestDischarged.plus(event.params.receiverAmount);
    creatorTokenMetric.save();
  }
  _platformMetric.save();

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

  const _platformMetric = loadOrCreatePlatformMetric(event.params.contractAddress);
  let tokenOwner = getProtonOwnerOf(event.params.contractAddress, event.params.tokenId);
  if (tokenOwner != Address.zero()) {
    const _walletOwner = loadOrCreateProfileMetric(tokenOwner);
    _walletOwner.releaseMassCount = _walletOwner.releaseMassCount.plus(ONE);
    _walletOwner.save();

    const userTokenMetric = loadOrCreateUserTokenMetric(tokenOwner, event.params.assetToken);
    userTokenMetric.totalInterestDischarged = userTokenMetric.totalInterestDischarged.plus(ownerInterest);
    userTokenMetric.totalMassReleased = userTokenMetric.totalMassReleased.plus(event.params.principalAmount);
    _platformMetric.platformInterestDischarged = _platformMetric.platformInterestDischarged.plus(event.params.receiverAmount);
    userTokenMetric.save();
  }

  let tokenCreator = getProtonCreatorOf(event.params.contractAddress, event.params.tokenId);
  if (tokenCreator != Address.zero()) {
    const creatorTokenMetric = loadOrCreateUserTokenMetric(tokenCreator, event.params.assetToken);
    creatorTokenMetric.totalInterestDischarged = creatorTokenMetric.totalInterestDischarged.plus(event.params.creatorAmount);
    _platformMetric.platformInterestDischarged = _platformMetric.platformInterestDischarged.plus(event.params.creatorAmount);
    creatorTokenMetric.save();
  }
  _platformMetric.save();

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
