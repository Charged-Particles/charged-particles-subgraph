import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ExternalContractSettings,
} from '../../generated/schema';


export function loadOrCreateExternalContractSettings(
  chargedParticlesAddress: Address,
  contractAddress: Address,
): ExternalContractSettings {
  const id = contractAddress.toHex();
  let _externalContractSettings = ExternalContractSettings.load(id);

  if (!_externalContractSettings) {
    _externalContractSettings = new ExternalContractSettings(id);
    _externalContractSettings.chargedParticles = chargedParticlesAddress.toHex();
    _externalContractSettings.contractAddress = contractAddress;
    _externalContractSettings.save();
  }

  return _externalContractSettings as ExternalContractSettings;
}
