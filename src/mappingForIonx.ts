import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  Transfer,
  Approval,
} from '../generated/Ionx/Ionx';

import { loadOrCreateIonxToken } from './helpers/loadOrCreateIonxToken';
import { loadOrCreateIonxTokenHolder } from './helpers/loadOrCreateIonxTokenHolder';

import { ADDRESS_ZERO } from './helpers/common';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _ionx = loadOrCreateIonxToken(event.address);
  _ionx.owner = event.params.newOwner;
  _ionx.save();
}

export function handleTransfer(event: Transfer): void {
  // Sender (not Mint)
  if (event.params.from.toHex() != ADDRESS_ZERO) {
    const sender = loadOrCreateIonxTokenHolder(event.address, event.params.from);
    sender.balance = sender.balance.minus(event.params.value);
    sender.save();
  }

  // Receiver (not Burn)
  if (event.params.to.toHex() != ADDRESS_ZERO) {
    const receiver = loadOrCreateIonxTokenHolder(event.address, event.params.to);
    receiver.balance = receiver.balance.plus(event.params.value);
    receiver.save();
  }
}

export function handleApproval(event: Approval): void {
  // const _ionx = loadOrCreateIonxToken(event.address);
  // _ionx.owner = event.params.newOwner;
  // _ionx.save();
}
