import { Address, Wrapped, JSONValue, Value, log } from '@graphprotocol/graph-ts';

import {
  StandardNFT,
  StandardNftAttributes,
} from '../generated/schema';

import {
  OwnershipTransferred,
  ControllerSet,
  ExecutorSet,
  PausedStateSet,
  NewSmartBasket,
  BasketAdd,
  BasketRemove,
  BasketRewarded,
} from '../generated/GenericBasketManager/GenericBasketManager';

import { nftAttributeId } from './helpers/idTemplates';
import { loadOrCreateGenericBasketManager } from './helpers/loadOrCreateGenericBasketManager';
import { loadOrCreateGenericSmartBasket } from './helpers/loadOrCreateGenericSmartBasket';
import { loadOrCreateGenericNftTokenBalance } from './helpers/loadOrCreateGenericNftTokenBalance';
import { loadOrCreateStandardNFT } from './helpers/loadOrCreateStandardNFT';
import { trackNftTxHistory } from './helpers/trackNftTxHistory';
import {
  ONE,
  getStringValue,
  parseJsonFromIpfs,
} from './helpers/common';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const genericBasketManager = loadOrCreateGenericBasketManager(event.address);
  genericBasketManager.owner = event.params.newOwner;
  genericBasketManager.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const genericBasketManager = loadOrCreateGenericBasketManager(event.address);
  genericBasketManager.chargedParticles = event.params.controller;
  genericBasketManager.save();
}

export function handleExecutorSet(event: ExecutorSet): void {
  // no-op
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const genericBasketManager = loadOrCreateGenericBasketManager(event.address);
  genericBasketManager.paused = event.params.isPaused;
  genericBasketManager.save();
}

export function handleNewSmartBasket(event: NewSmartBasket): void {
  const genericBasketManager = loadOrCreateGenericBasketManager(event.address);
  const genericSmartBasket = loadOrCreateGenericSmartBasket(event.params.contractAddress, event.params.tokenId);
  genericSmartBasket.address = event.params.smartBasket;
  genericSmartBasket.basketManager = genericBasketManager.id;
  genericSmartBasket.managerId = "generic";
  genericSmartBasket.save();
}

export function handleBasketAdd(event: BasketAdd): void {
  const genericSmartBasket = loadOrCreateGenericSmartBasket(event.params.contractAddress, event.params.tokenId);
  genericSmartBasket.totalTokens = genericSmartBasket.totalTokens.plus(ONE);
  genericSmartBasket.save();

  const nftTokenBalance = loadOrCreateGenericNftTokenBalance(genericSmartBasket.id, event.params.basketTokenAddress, event.params.contractAddress, event.params.tokenId);
  let nftTokenIds = nftTokenBalance.nftTokenIds;
  if (nftTokenIds) {
    nftTokenIds.push(event.params.basketTokenId);
    nftTokenBalance.nftTokenIds = nftTokenIds;
    nftTokenBalance.save();
  }

  const stdNft = loadOrCreateStandardNFT(event.params.basketTokenAddress, event.params.basketTokenId);
  const stdNftMetadataUri = stdNft.metadataUri;
  if (stdNftMetadataUri) {
    const jsonData:Wrapped<JSONValue> | null = parseJsonFromIpfs(stdNftMetadataUri);
    if (jsonData) {
      processStandardMetadata(jsonData.inner, Value.fromString(stdNft.id));
    }
  }

  var eventData = new Array<string>(4);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.basketTokenAddress.toHex();
  eventData[3] = event.params.basketTokenId.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'BasketAdd', eventData.join('-'));
}

export function handleBasketRemove(event: BasketRemove): void {
  const genericSmartBasket = loadOrCreateGenericSmartBasket(event.params.contractAddress, event.params.tokenId);
  genericSmartBasket.totalTokens.minus(ONE);
  genericSmartBasket.save();

  const nftTokenBalance = loadOrCreateGenericNftTokenBalance(genericSmartBasket.id, event.params.basketTokenAddress, event.params.contractAddress, event.params.tokenId);
  let ids = nftTokenBalance.nftTokenIds;
  if (ids) {
    const index = ids.indexOf(event.params.basketTokenId);
    if (index > -1) {
      ids = ids.slice(0, index).concat(ids.slice(index + 1));
    }
    nftTokenBalance.nftTokenIds = ids;
    nftTokenBalance.save();
  }
  var eventData = new Array<string>(5);
  eventData[0] = event.params.receiver.toHex();
  eventData[1] = event.params.contractAddress.toHex();
  eventData[2] = event.params.tokenId.toString();
  eventData[3] = event.params.basketTokenAddress.toHex();
  eventData[4] = event.params.basketTokenId.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'BasketRemove', eventData.join('-'));
}

export function handleBasketRewarded(event: BasketRewarded): void {
  // TODO
}

export function processStandardMetadata(value: JSONValue, userData: Value): void {
  const standardNftId = userData.toString();
  const standardMetadata = value.toObject();
  if (standardMetadata == null) { return; }

  const _nft = StandardNFT.load(standardNftId);
  if (!_nft) { return; }

  _nft.name             = getStringValue(standardMetadata, 'name');
  _nft.symbol           = getStringValue(standardMetadata, 'symbol');
  _nft.description      = getStringValue(standardMetadata, 'description');
  _nft.external_url     = getStringValue(standardMetadata, 'external_url');
  _nft.icon             = getStringValue(standardMetadata, 'icon');
  _nft.image            = getStringValue(standardMetadata, 'image');
  _nft.save();

  let attributes = standardMetadata.get('attributes');
  if (attributes) {
    const attrArr = attributes.toArray();
    for (let i = 0; i < attrArr.length; i++) {
      const attrMap = attrArr[i].toObject();

      let jsonValue:JSONValue | null;
      let attrName = '';
      let attrValue = '';
      if (attrMap.isSet('name')) {
        jsonValue = attrMap.get('name');
        if (jsonValue) { attrName = jsonValue.toString(); }
        jsonValue = attrMap.get('value');
        if (jsonValue) { attrValue = jsonValue.toString(); }
      }

      const nftAttr = new StandardNftAttributes(nftAttributeId(standardNftId, i.toString()));
      nftAttr.standardNft = standardNftId;
      nftAttr.name = attrName;
      nftAttr.value = attrValue;
      nftAttr.save();
    }
  }
}
