import { Address, BigInt, TypedMap, ipfs, json, Bytes, JSONValue, Value, log, Entity, ByteArray } from '@graphprotocol/graph-ts';

import {
  ProtonNFT,
  NFTAttributes,
} from '../generated/schema';

import {
  OwnershipTransferred,
  ChargedParticlesSet,
  MintFeeSet,
  SalePriceSet,
  CreatorRoyaltiesSet,
  FeesWithdrawn,
  Transfer,
  Approval,
  ApprovalForAll,
} from '../generated/Proton/Proton';

import { nftAttributeId } from './helpers/idTemplates';
import { loadOrCreateProton } from './helpers/loadOrCreateProton';
import { loadOrCreateProtonNFT } from './helpers/loadOrCreateProtonNFT';

import { ADDRESS_ZERO } from './helpers/common';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.owner = event.params.newOwner;
  _proton.save();
}

export function handleChargedParticlesSet(event: ChargedParticlesSet): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.chargedParticles = event.params.chargedParticles.toHex();
  _proton.save();
}

export function handleMintFeeSet(event: MintFeeSet): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.mintFee = event.params.fee;
  _proton.save();
}

export function handleSalePriceSet(event: SalePriceSet): void {
  const _nft = loadOrCreateProtonNFT(event.address, event.params.tokenId);
  _nft.salePrice = event.params.salePrice;
  _nft.save();
}

export function handleCreatorRoyaltiesSet(event: CreatorRoyaltiesSet): void {
  const _nft = loadOrCreateProtonNFT(event.address, event.params.tokenId);
  _nft.resaleRoyalties = event.params.royaltiesPct;
  _nft.save();
}

export function handleFeesWithdrawn(event: FeesWithdrawn): void {
  log.info('TODO: handleFeesWithdrawn', []);
}

export function handleTransfer(event: Transfer): void {
  const _nft = loadOrCreateProtonNFT(event.address, event.params.tokenId);
  _nft.owner = event.params.to;
  _nft.save();

  if (event.params.from.toHex() == ADDRESS_ZERO) {
    const ipfsHashParts = _nft.metadataUri.split('/');
    const ipfsHash = ipfsHashParts[ipfsHashParts.length-1];
    // ipfs.mapJSON(ipfsHash, 'processProtonMetadata', Value.fromString(_nft.id));
    let data = ipfs.cat(ipfsHash)
    if (data) {
      processProtonMetadata(json.fromBytes(data as Bytes), Value.fromString(_nft.id));
    }
  }
}

export function handleApproval(event: Approval): void {
  log.info('TODO: handleApproval', []);
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  log.info('TODO: handleApprovalForAll', []);
}


export function processProtonMetadata(value: JSONValue, userData: Value): void {
  const protonNftId = userData.toString();
  const protonMetadata = value.toObject();
  if (protonMetadata == null) {
    log.info('NO METADATA FOUND FOR {}', [protonNftId]);
  }

  // Callbacks can also created entities
  const _nft = ProtonNFT.load(protonNftId);
  _nft.particleType = protonMetadata.get('particleType').toString();
  _nft.creatorAnnuity = protonMetadata.get('creatorAnnuity').toBigInt();
  _nft.burnToRelease = protonMetadata.get('burnToRelease').toBool();

  _nft.name = protonMetadata.get('name').toString();
  _nft.description = protonMetadata.get('description').toString();
  _nft.external_url = protonMetadata.get('external_url').toString();
  _nft.animation_url = protonMetadata.get('animation_url').toString();
  _nft.youtube_url = protonMetadata.get('youtube_url').toString();
  _nft.icon = protonMetadata.get('icon').toString();
  _nft.image = protonMetadata.get('image').toString();
  _nft.symbol = protonMetadata.get('symbol').toString();
  _nft.decimals = protonMetadata.get('decimals').toBigInt();
  _nft.background_color = protonMetadata.get('background_color').toString();
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
