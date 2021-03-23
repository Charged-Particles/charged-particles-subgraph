import { Address, Wrapped, JSONValue, Value, log } from '@graphprotocol/graph-ts';

import {
  ProtonNFT,
  NFTAttributes,
} from '../generated/schema';

import {
  OwnershipTransferred,
  UniverseSet,
  ChargedStateSet,
  ChargedSettingsSet,
  ChargedParticlesSet,
  PausedStateSet,
  SalePriceSet,
  CreatorRoyaltiesSet,
  ProtonSold,
  RoyaltiesClaimed,
  FeesWithdrawn,
  Transfer,
  Approval,
  ApprovalForAll,
} from '../generated/Proton/Proton';

import { nftAttributeId } from './helpers/idTemplates';
import { loadOrCreateProton } from './helpers/loadOrCreateProton';
import { loadOrCreateProtonNFT } from './helpers/loadOrCreateProtonNFT';
import { trackProtonNftCounts } from './helpers/trackProtonNftCounts';
import { loadOrCreateNftState } from './helpers/loadOrCreateNftState';
import { trackNftTxHistory } from './helpers/trackNftTxHistory';
import { loadOrCreateApprovedOperator } from './helpers/loadOrCreateApprovedOperator';
import { ZERO, ADDRESS_ZERO, NEG_ONE, getStringValue, getBigIntValue, parseJsonFromIpfs } from './helpers/common';
import { loadOrCreateClaimedRoyalties } from './helpers/loadOrCreateClaimedRoyalties';
import { updateNftAnalytics } from './helpers/updateNftAnalytics';



export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.owner = event.params.newOwner;
  _proton.save();
}

export function handleUniverseSet(event: UniverseSet): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.universe = event.params.universe.toHex();
  _proton.save();
}

export function handleChargedStateSet(event: ChargedStateSet): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.chargedState = event.params.chargedState.toHex();
  _proton.save();
}

export function handleChargedSettingsSet(event: ChargedSettingsSet): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.chargedSettings = event.params.chargedSettings.toHex();
  _proton.save();
}

export function handleChargedParticlesSet(event: ChargedParticlesSet): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.chargedParticles = event.params.chargedParticles.toHex();
  _proton.save();
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.paused = event.params.isPaused;
  _proton.save();
}

export function handleSalePriceSet(event: SalePriceSet): void {
  const _nft = loadOrCreateProtonNFT(event.address, event.params.tokenId);
  _nft.salePrice = event.params.salePrice;
  _nft.save();

  var eventData = new Array<string>(2);
  eventData[0] = event.params.tokenId.toString();
  eventData[1] = event.params.salePrice.toString();
  trackNftTxHistory(event, event.address, event.params.tokenId, 'SalePriceSet', eventData.join('-'));
}

export function handleCreatorRoyaltiesSet(event: CreatorRoyaltiesSet): void {
  const _nft = loadOrCreateProtonNFT(event.address, event.params.tokenId);
  _nft.resaleRoyalties = event.params.royaltiesPct;
  _nft.save();

  var eventData = new Array<string>(2);
  eventData[0] = event.params.tokenId.toString();
  eventData[1] = event.params.royaltiesPct.toString();
  trackNftTxHistory(event, event.address, event.params.tokenId, 'CreatorRoyaltiesSet', eventData.join('-'));
}

export function handleProtonSold(event: ProtonSold): void {
  const _nft = loadOrCreateProtonNFT(event.address, event.params.tokenId);
  _nft.overallSalesTotal = _nft.overallSalesTotal.plus(event.params.salePrice);
  _nft.save();

  const _proton = loadOrCreateProton(event.address);
  const _nftState = loadOrCreateNftState(
    Address.fromString(_proton.chargedState),
    event.address,
    event.params.tokenId,
  );
  _nftState.tempLockExpiry = ZERO;
  _nftState.save();

  var eventData = new Array<string>(6);
  eventData[0] = event.params.tokenId.toString();
  eventData[1] = event.params.oldOwner.toHex();
  eventData[2] = event.params.newOwner.toHex();
  eventData[3] = event.params.salePrice.toString();
  eventData[4] = event.params.creator.toHex();
  eventData[5] = event.params.creatorRoyalties.toString();
  trackNftTxHistory(event, event.address, event.params.tokenId, 'ProtonSold', eventData.join('-'));
  updateNftAnalytics(event.address, event.params.tokenId, true, event.params.creatorRoyalties, event.params.salePrice);
}

export function handleRoyaltiesClaimed(event: RoyaltiesClaimed): void {
  const _royaltiesClaimedByAccount = loadOrCreateClaimedRoyalties(event.params.receiver);

  _royaltiesClaimedByAccount.royaltiesClaimed = _royaltiesClaimedByAccount.royaltiesClaimed.plus(event.params.amountClaimed);
  _royaltiesClaimedByAccount.save();
}

export function handleFeesWithdrawn(event: FeesWithdrawn): void {
  log.info('TODO: handleFeesWithdrawn', []);
}

export function handleTransfer(event: Transfer): void {
  const _nft = loadOrCreateProtonNFT(event.address, event.params.tokenId);
  _nft.owner = event.params.to;
  _nft.salePrice = ZERO;
  _nft.save();

  trackProtonNftCounts(event);

  var eventData = new Array<string>(3);
  eventData[0] = event.params.tokenId.toString();
  eventData[1] = event.params.from.toHex();
  eventData[2] = event.params.to.toHex();
  trackNftTxHistory(event, event.address, event.params.tokenId, 'Transfer', eventData.join('-'));

  if (event.params.from.toHex() == ADDRESS_ZERO) {
    const jsonData:Wrapped<JSONValue> | null = parseJsonFromIpfs(_nft.metadataUri);
    if (jsonData != null) {
      processProtonMetadata(jsonData.inner, Value.fromString(_nft.id));
    }
  }
}

export function handleApproval(event: Approval): void {
  const assetAddress = event.address;
  const ownerAddress = event.params.owner;
  const operatorAddress = event.params.approved;
  const tokenId = event.params.tokenId;

  const _approvedOperator = loadOrCreateApprovedOperator(assetAddress, ownerAddress, operatorAddress);
  _approvedOperator.tokenIds.push(tokenId);
  _approvedOperator.save();
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  const assetAddress = event.address;
  const ownerAddress = event.params.owner;
  const operatorAddress = event.params.operator;

  const _approvedOperator = loadOrCreateApprovedOperator(assetAddress, ownerAddress, operatorAddress);
  const _approvedAllIndicator = NEG_ONE;
  _approvedOperator.tokenIds.push(_approvedAllIndicator); //A value of -1 means approval for all tokens owned by ownerAddress
  _approvedOperator.save();
}


export function processProtonMetadata(value: JSONValue, userData: Value): void {
  const protonNftId = userData.toString();
  const protonMetadata = value.toObject();
  if (protonMetadata == null) { return; }

  const _nft = ProtonNFT.load(protonNftId);
  if (!_nft) { return; }

  _nft.creatorAnnuity   = getBigIntValue(protonMetadata, 'creatorAnnuity');
  _nft.decimals         = getBigIntValue(protonMetadata, 'decimals');

  _nft.particleType     = getStringValue(protonMetadata, 'particleType');
  _nft.name             = getStringValue(protonMetadata, 'name');
  _nft.description      = getStringValue(protonMetadata, 'description');
  _nft.external_url     = getStringValue(protonMetadata, 'external_url');
  _nft.animation_url    = getStringValue(protonMetadata, 'animation_url');
  _nft.youtube_url      = getStringValue(protonMetadata, 'youtube_url');
  _nft.icon             = getStringValue(protonMetadata, 'icon');
  _nft.thumbnail        = getStringValue(protonMetadata, 'thumbnail');
  _nft.image            = getStringValue(protonMetadata, 'image');
  _nft.symbol           = getStringValue(protonMetadata, 'symbol');
  _nft.background_color = getStringValue(protonMetadata, 'background_color');

  _nft.save();

  const attributes = protonMetadata.get('attributes').toArray();
  for (let i = 0; i < attributes.length; i++) {
    const attrMap = attributes[i].toObject();

    let attrName = '';
    let attrValue = '';
    if (attrMap.isSet('name')) {
      attrName = attrMap.get('name').toString();
      attrValue = attrMap.get('value').toString();
    }

    const nftAttr = new NFTAttributes(nftAttributeId(protonNftId, i.toString()));
    nftAttr.protonNft = protonNftId;
    nftAttr.name = attrName;
    nftAttr.value = attrValue;
    nftAttr.save();
  }
}
