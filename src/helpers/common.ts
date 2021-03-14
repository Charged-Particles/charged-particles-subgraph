import { Bytes, TypedMap, JSONValue, BigInt, Wrapped, ipfs, json, log } from '@graphprotocol/graph-ts';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const ZERO = BigInt.fromI32(0);
export const ONE = BigInt.fromI32(1);
export const NEG_ONE = BigInt.fromI32(-1);


export function getStringValue(obj: TypedMap<string, JSONValue>, key: string): string {
  if (obj.isSet(key) && !obj.get(key).isNull()) {
    return obj.get(key).toString();
  }
  return '';
};

export function getBigIntValue(obj: TypedMap<string, JSONValue>, key: string): BigInt {
  if (obj.isSet(key) && !obj.get(key).isNull()) {
    return obj.get(key).toBigInt();
  }
  return ZERO;
};

export function parseJsonFromIpfs(jsonUri: string): Wrapped<JSONValue> | null {
  const ipfsHashParts = jsonUri.split('/');
  const ipfsHash = ipfsHashParts[ipfsHashParts.length-1];

  if (ipfsHash.length < 1) {
    log.info('NO IPFS HASH FOUND WITH URI {}', [jsonUri]);
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
