import { Address, Bytes, TypedMap, JSONValue, BigInt, Wrapped, ipfs, json, log, Value } from '@graphprotocol/graph-ts';

import {
  GlobalData,
} from '../../generated/schema';

import {
  ChargedParticles as ChargedParticlesContract,
} from '../../generated/ChargedParticles/ChargedParticles';

import {
  Proton as ProtonContract
} from '../../generated/Proton/Proton';


export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const ZERO = BigInt.fromI32(0);
export const ONE = BigInt.fromI32(1);
export const NEG_ONE = BigInt.fromI32(-1);

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
  const _global = GlobalData.load('V1');
  if (_global != null) {
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