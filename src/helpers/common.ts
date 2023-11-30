import { Address, Bytes, ByteArray, TypedMap, JSONValue, BigInt, Wrapped, ipfs, json, log, Value } from '@graphprotocol/graph-ts';

import {
  GlobalData,
  StandardNFT,
} from '../../generated/schema';

import {
  ChargedParticles as ChargedParticlesContract,
} from '../../generated/ChargedParticles/ChargedParticles';

import { Proton as ProtonContract } from '../../generated/Universe/Proton';
import { ERC165 as NftContract165 } from '../../generated/GenericBasketManagerB/ERC165';
import { ERC721 as NftContract721 } from '../../generated/GenericBasketManagerB/ERC721';
import { ERC1155 as NftContract1155 } from '../../generated/GenericBasketManagerB/ERC1155';

import { supportsInterface } from './supportsInterface';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const ZERO = BigInt.fromI32(0);
export const ONE = BigInt.fromI32(1);
export const NEG_ONE = BigInt.fromI32(-1);

export function standardEntityId(parts: string[]): string {
  return parts.join('-');
}

export function replaceURI(uri: string, identifier: BigInt): string {
	return uri.replace(/\{id\}/gi, identifier.toHex().slice(2).padStart(64, '0'));
}

export function getStringValue(obj: TypedMap<string, JSONValue>, key: string): string {
  if (obj.isSet(key)) {
    const val = obj.get(key);
    if (val && !val.isNull()) {
      return val.toString();
    }
  }
  return '';
};

export function getBigIntValue(obj: TypedMap<string, JSONValue>, key: string): BigInt {
  if (obj.isSet(key)) {
    const val = obj.get(key);
    if (val && !val.isNull()) {
      return val.toBigInt();
    }
  }
  return ZERO;
};

export function isErc721(contractAddress: Address, tokenId: BigInt): boolean {
  const bound = NftContract165.bind(contractAddress);
  const introspection_01ffc9a7 = supportsInterface(bound, '01ffc9a7'); // ERC165
  const introspection_80ac58cd = supportsInterface(bound, '80ac58cd'); // ERC721
  const introspection_00000000 = supportsInterface(bound, '00000000', false);
  return introspection_01ffc9a7 && introspection_80ac58cd && introspection_00000000;
}

export function isErc1155(contractAddress: Address, tokenId: BigInt): boolean {
  const bound = NftContract165.bind(contractAddress);
  const introspection_01ffc9a7 = supportsInterface(bound, '01ffc9a7'); // ERC165
  const introspection_80ac58cd = supportsInterface(bound, 'd9b67a26'); // ERC1155
  const introspection_00000000 = supportsInterface(bound, '00000000', false);
  return introspection_01ffc9a7 && introspection_80ac58cd && introspection_00000000;
}

export function getStandardNFTOwnerOf(contractAddress: Address, tokenId: BigInt): Address {
  let tokenOwner:Address = Address.zero();
  if (!isErc1155(contractAddress, tokenId)) {
    const boundNft = NftContract721.bind(contractAddress);
    let callResult = boundNft.try_ownerOf(tokenId);
    if (callResult.reverted) {
      log.info('ERC721.ownerOf reverted', []);
    } else {
      tokenOwner = callResult.value;
    }
  }
  return tokenOwner;
}

export function getStandardNFTTokenURI(contractAddress: Address, tokenId: BigInt): string {
  let tokenURI:string = '';
  if (isErc1155(contractAddress, tokenId)) {
    const boundNft = NftContract1155.bind(contractAddress);
    let callResult = boundNft.try_uri(tokenId);
    if (callResult.reverted) {
      log.info('ERC1155.uri reverted', []);
    } else {
      tokenURI = callResult.value;
    }
  } else {
    const boundNft = NftContract721.bind(contractAddress);
    let callResult = boundNft.try_tokenURI(tokenId);
    if (callResult.reverted) {
      log.info('ERC721.tokenURI reverted', []);
    } else {
      tokenURI = callResult.value;
    }
  }
  return tokenURI;
}

export function getProtonOwnerOf(contractAddress: Address, tokenId: BigInt): Address {
  let tokenOwner:Address = Address.zero();
  const boundProton = ProtonContract.bind(contractAddress);
  let callResult = boundProton.try_ownerOf(tokenId);
  if (callResult.reverted) {
    log.info('Proton.ownerOf reverted', []);
  } else {
    tokenOwner = callResult.value;
  }
  return tokenOwner;
}

export function getProtonCreatorOf(contractAddress: Address, tokenId: BigInt): Address {
  let tokenCreator:Address = Address.zero();
  const boundProton = ProtonContract.bind(contractAddress);
  let callResult = boundProton.try_creatorOf(tokenId);
  if (callResult.reverted) {
    log.info('Proton.creatorOf reverted', []);
  } else {
    tokenCreator = callResult.value;
  }
  return tokenCreator;
}

export function getProtonTokenURI(contractAddress: Address, tokenId: BigInt): string {
  let tokenUri:string = '';
  const boundProton = ProtonContract.bind(contractAddress);
  let callResult = boundProton.try_tokenURI(tokenId);
  if (callResult.reverted) {
    log.info('Proton.tokenURI reverted', []);
  } else {
    tokenUri = callResult.value;
  }
  return tokenUri;
}

export function getBaseParticleMass(contractAddress: Address, tokenId: BigInt, walletMgrId: string, assetToken: Address): BigInt {
  let mass:BigInt = BigInt.fromI32(0);
  const _global = GlobalData.load('ChargedParticlesV1');
  if (_global != null) {
    log.info("ChargedParticlesV1 {}", [_global.chargedParticlesAddress.toString()]);
    const _chargedParticles = ChargedParticlesContract.bind(_global.chargedParticlesAddress as Address);
    let callResult = _chargedParticles.try_baseParticleMass(contractAddress, tokenId, walletMgrId, assetToken);
    if (callResult.reverted) {
      log.info('ChargedParticles.baseParticleMass reverted', []);
    } else {
      mass = callResult.value;
    }
  }
  return mass;
}

export function parseJsonFromIpfs(jsonUri: string): Wrapped<JSONValue> | null {
  const ipfsHashParts = jsonUri.split('/');
  const ipfsHash = ipfsHashParts[ipfsHashParts.length-1];

  if (ipfsHash.length < 1) {
    log.info('NO IPFS HASH FOUND WITH URI {}', [jsonUri]);
    return null;
  }

  if (ipfsHash[0] != 'Q' || ipfsHash[1] != 'm') {
    log.info('INVALID IPFS HASH FOUND FOR URI {}', [jsonUri]);
    return null;
  }

  let data = ipfs.cat(ipfsHash);
  if (!data || (data as Bytes).length < 1) {
    log.info('JSON DATA FROM IPFS IS EMPTY {}', [ipfsHash]);
    return null;
  }

  const jsonData = json.fromBytes(data as Bytes);
  if (jsonData.isNull()) {
    log.info('JSON DATA FROM IPFS IS NULL {}', [ipfsHash]);
    return null;
  }

  return new Wrapped(jsonData);
};

const logItems = (value:JSONValue, userData: Value): void => {
  log.info('Found value {} {} on IPFS', [value.toString(), userData.toString()])
}