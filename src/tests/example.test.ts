import { clearStore, test } from 'matchstick-as/assembly/index';
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
  handleWalletEnergized
} from '../mappingForGenericWalletManager';

  function createWalletEnergizedEvent(contractAddress: string,  tokenId: number, assetToken: string, assetAmount: number, yieldTokensAmount: number): WalletEnergized {
    let walletEnergizedEvent = new WalletEnergized();
    walletEnergizedEvent.parameters = new Array();

    let contractAddressParam = new ethereum.EventParam();
    let tokenIdParam = new ethereum.EventParam();
    let assetTokenParam = new ethereum.EventParam();
    let assetAmountParam = new ethereum.EventParam();
    let yieldTokensAmountParam = new ethereum.EventParam();

    contractAddressParam.value = ethereum.Value.fromAddress(Address.fromString(contractAddress));
    tokenIdParam.value =  ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(<i32>tokenId));

    //log.info("Val %s!",[tokenIdParam.value]);
    assetTokenParam.value = ethereum.Value.fromAddress(Address.fromString(assetToken));
    assetAmountParam.value =  ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(<i32>assetAmount));
    yieldTokensAmountParam.value =  ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(<i32>yieldTokensAmount));

    walletEnergizedEvent.parameters.push(contractAddressParam); 
    walletEnergizedEvent.parameters.push(tokenIdParam);
    walletEnergizedEvent.parameters.push(assetTokenParam);
    walletEnergizedEvent.parameters.push(assetAmountParam);
    walletEnergizedEvent.parameters.push(yieldTokensAmountParam);

    return walletEnergizedEvent;
  }
  export function runTests(): void {
    log.info("Yassy!",[]);
    test("Energize then Discharge balance", () => {
    
        let newEnergizeEvent = createWalletEnergizedEvent("0xd4f7389297d9cea850777ea6ccbd7db5817a12b2",247,"0xa562464147c3054592a3836cff103d29d78cd263",10000,0);
        log.info("Yassy!",[]);
        
       handleWalletEnergized(newEnergizeEvent); // Panic
        clearStore();
    });
}