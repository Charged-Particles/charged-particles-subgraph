import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Ionx,
} from '../../generated/schema';

import {
  Ionx as IonxContract,
} from '../../generated/Universe/Ionx';


export function loadOrCreateIonxToken(
  ionxAddress: Address
): Ionx {
  const id = ionxAddress.toHex();
  let _ionx = Ionx.load(id);

  if (!_ionx) {
    _ionx = new Ionx(id);
    const boundIonx = IonxContract.bind(ionxAddress);
    _ionx.owner = boundIonx.owner();
    _ionx.save();
  }

  return _ionx as Ionx;
}
