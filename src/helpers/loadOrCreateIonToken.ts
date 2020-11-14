import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Ion,
} from '../../generated/schema';

import {
  Ion as IonContract,
} from '../../generated/Ion/Ion';


export function loadOrCreateIonToken(
  ionAddress: Address
): Ion {
  const id = ionAddress.toHex();
  let _ion = Ion.load(id);

  if (!_ion) {
    _ion = new Ion(id);
    const boundIon = IonContract.bind(ionAddress);
    _ion.owner = boundIon.owner();
    _ion.save();
  }

  return _ion as Ion;
}
