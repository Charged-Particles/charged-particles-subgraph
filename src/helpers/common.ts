import { TypedMap, JSONValue, BigInt } from '@graphprotocol/graph-ts';

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
