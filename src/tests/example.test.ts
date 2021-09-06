import { clearStore, test, } from 'matchstick-as/assembly/index';
import { Address, BigInt, Bytes, ethereum, store, Value, log } from "@graphprotocol/graph-ts";
import {
    OwnershipTransferred,
    ControllerSet,
    PausedStateSet,
    NewSmartWallet,
    WalletEnergized,
    WalletReleased,
    WalletRewarded,
  } from '../../generated/GenericWalletManager/GenericWalletManager';

import {
Proton as ProtonContract
} from '../../generated/Proton/Proton';

export function runTests() {
    test("Energize then Discharge balance", () => {
        let walletEnergizedEvent = new WalletEnergized();
        walletEnergizedEvent.parameters = new Array();
        let contractAddress = new ethereum.EventParam();
        contractAddress.value = ethereum.Value.fromAddress(Address.fromString("0x757026eFA43363770df21bB71E3f25aB82C7B68B"));
        log.info("Yay!",[]);
        
        clearStore();
    });
}