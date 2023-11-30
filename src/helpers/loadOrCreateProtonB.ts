import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Proton,
} from '../../generated/schema';

import {
  ProtonB as ProtonContract,
} from '../../generated/GenericWalletManagerB/ProtonB';


export function loadOrCreateProtonB(
  protonAddress: Address
): Proton {
  const id = protonAddress.toHex();
  let _proton = Proton.load(id);

  if (!_proton) {
    _proton = new Proton(id);
    _proton.version = "B";
    const boundProton = ProtonContract.bind(protonAddress);
    _proton.owner = boundProton.owner();
    _proton.save();
  }

  return _proton as Proton;
}
