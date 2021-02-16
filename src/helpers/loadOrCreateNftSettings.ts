import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  NftSettings,
} from '../../generated/schema';


export function loadOrCreateNftSettings(
  chargedSettingsAddress: Address,
  contractAddress: Address,
): NftSettings {
  const id = contractAddress.toHex();
  let _nftSettings = NftSettings.load(id);

  if (!_nftSettings) {
    _nftSettings = new NftSettings(id);
    _nftSettings.chargedSettings = chargedSettingsAddress.toHex();
    _nftSettings.contractAddress = contractAddress;

    _nftSettings.allowCharge = false;
    _nftSettings.allowBond = false;
    _nftSettings.allowTimelockAnyNft = false;
    _nftSettings.allowTimelockOwnNft = false;
    _nftSettings.hasRestrictedAssets = false;

    _nftSettings.save();
  }

  return _nftSettings as NftSettings;
}
