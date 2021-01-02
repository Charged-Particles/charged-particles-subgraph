// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ChargedParticlesSet extends ethereum.Event {
  get params(): ChargedParticlesSet__Params {
    return new ChargedParticlesSet__Params(this);
  }
}

export class ChargedParticlesSet__Params {
  _event: ChargedParticlesSet;

  constructor(event: ChargedParticlesSet) {
    this._event = event;
  }

  get chargedParticles(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class IonRewardsMultiplierSet extends ethereum.Event {
  get params(): IonRewardsMultiplierSet__Params {
    return new IonRewardsMultiplierSet__Params(this);
  }
}

export class IonRewardsMultiplierSet__Params {
  _event: IonRewardsMultiplierSet;

  constructor(event: IonRewardsMultiplierSet) {
    this._event = event;
  }

  get assetToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get multiplier(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class IonTokenSet extends ethereum.Event {
  get params(): IonTokenSet__Params {
    return new IonTokenSet__Params(this);
  }
}

export class IonTokenSet__Params {
  _event: IonTokenSet;

  constructor(event: IonTokenSet) {
    this._event = event;
  }

  get ionToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ProtonTokenSet extends ethereum.Event {
  get params(): ProtonTokenSet__Params {
    return new ProtonTokenSet__Params(this);
  }
}

export class ProtonTokenSet__Params {
  _event: ProtonTokenSet;

  constructor(event: ProtonTokenSet) {
    this._event = event;
  }

  get protonToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class RewardIssued extends ethereum.Event {
  get params(): RewardIssued__Params {
    return new RewardIssued__Params(this);
  }
}

export class RewardIssued__Params {
  _event: RewardIssued;

  constructor(event: RewardIssued) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get rewardToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get rewardAmount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Universe extends ethereum.SmartContract {
  static bind(address: Address): Universe {
    return new Universe("Universe", address);
  }

  chargedParticles(): Address {
    let result = super.call(
      "chargedParticles",
      "chargedParticles():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_chargedParticles(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "chargedParticles",
      "chargedParticles():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ionToken(): Address {
    let result = super.call("ionToken", "ionToken():(address)", []);

    return result[0].toAddress();
  }

  try_ionToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("ionToken", "ionToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proton(): Address {
    let result = super.call("proton", "proton():(address)", []);

    return result[0].toAddress();
  }

  try_proton(): ethereum.CallResult<Address> {
    let result = super.tryCall("proton", "proton():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class OnDischargeCall extends ethereum.Call {
  get inputs(): OnDischargeCall__Inputs {
    return new OnDischargeCall__Inputs(this);
  }

  get outputs(): OnDischargeCall__Outputs {
    return new OnDischargeCall__Outputs(this);
  }
}

export class OnDischargeCall__Inputs {
  _call: OnDischargeCall;

  constructor(call: OnDischargeCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get value2(): string {
    return this._call.inputValues[2].value.toString();
  }

  get assetToken(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get value4(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get receiverAmount(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class OnDischargeCall__Outputs {
  _call: OnDischargeCall;

  constructor(call: OnDischargeCall) {
    this._call = call;
  }
}

export class OnEnergizeCall extends ethereum.Call {
  get inputs(): OnEnergizeCall__Inputs {
    return new OnEnergizeCall__Inputs(this);
  }

  get outputs(): OnEnergizeCall__Outputs {
    return new OnEnergizeCall__Outputs(this);
  }
}

export class OnEnergizeCall__Inputs {
  _call: OnEnergizeCall;

  constructor(call: OnEnergizeCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get liquidityProviderId(): string {
    return this._call.inputValues[2].value.toString();
  }

  get assetToken(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get assetAmount(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class OnEnergizeCall__Outputs {
  _call: OnEnergizeCall;

  constructor(call: OnEnergizeCall) {
    this._call = call;
  }
}

export class OnProtonSaleCall extends ethereum.Call {
  get inputs(): OnProtonSaleCall__Inputs {
    return new OnProtonSaleCall__Inputs(this);
  }

  get outputs(): OnProtonSaleCall__Outputs {
    return new OnProtonSaleCall__Outputs(this);
  }
}

export class OnProtonSaleCall__Inputs {
  _call: OnProtonSaleCall;

  constructor(call: OnProtonSaleCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get oldOwner(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get newOwner(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get salePrice(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get creator(): Address {
    return this._call.inputValues[5].value.toAddress();
  }

  get creatorRoyalties(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }
}

export class OnProtonSaleCall__Outputs {
  _call: OnProtonSaleCall;

  constructor(call: OnProtonSaleCall) {
    this._call = call;
  }
}

export class OnReleaseCall extends ethereum.Call {
  get inputs(): OnReleaseCall__Inputs {
    return new OnReleaseCall__Inputs(this);
  }

  get outputs(): OnReleaseCall__Outputs {
    return new OnReleaseCall__Outputs(this);
  }
}

export class OnReleaseCall__Inputs {
  _call: OnReleaseCall;

  constructor(call: OnReleaseCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get value2(): string {
    return this._call.inputValues[2].value.toString();
  }

  get assetToken(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get principalAmount(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get value5(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get receiverAmount(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }
}

export class OnReleaseCall__Outputs {
  _call: OnReleaseCall;

  constructor(call: OnReleaseCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetChargedParticlesCall extends ethereum.Call {
  get inputs(): SetChargedParticlesCall__Inputs {
    return new SetChargedParticlesCall__Inputs(this);
  }

  get outputs(): SetChargedParticlesCall__Outputs {
    return new SetChargedParticlesCall__Outputs(this);
  }
}

export class SetChargedParticlesCall__Inputs {
  _call: SetChargedParticlesCall;

  constructor(call: SetChargedParticlesCall) {
    this._call = call;
  }

  get _chargedParticles(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetChargedParticlesCall__Outputs {
  _call: SetChargedParticlesCall;

  constructor(call: SetChargedParticlesCall) {
    this._call = call;
  }
}

export class SetIonRewardsMultiplierCall extends ethereum.Call {
  get inputs(): SetIonRewardsMultiplierCall__Inputs {
    return new SetIonRewardsMultiplierCall__Inputs(this);
  }

  get outputs(): SetIonRewardsMultiplierCall__Outputs {
    return new SetIonRewardsMultiplierCall__Outputs(this);
  }
}

export class SetIonRewardsMultiplierCall__Inputs {
  _call: SetIonRewardsMultiplierCall;

  constructor(call: SetIonRewardsMultiplierCall) {
    this._call = call;
  }

  get assetToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get multiplier(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetIonRewardsMultiplierCall__Outputs {
  _call: SetIonRewardsMultiplierCall;

  constructor(call: SetIonRewardsMultiplierCall) {
    this._call = call;
  }
}

export class SetIonTokenCall extends ethereum.Call {
  get inputs(): SetIonTokenCall__Inputs {
    return new SetIonTokenCall__Inputs(this);
  }

  get outputs(): SetIonTokenCall__Outputs {
    return new SetIonTokenCall__Outputs(this);
  }
}

export class SetIonTokenCall__Inputs {
  _call: SetIonTokenCall;

  constructor(call: SetIonTokenCall) {
    this._call = call;
  }

  get _ionToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetIonTokenCall__Outputs {
  _call: SetIonTokenCall;

  constructor(call: SetIonTokenCall) {
    this._call = call;
  }
}

export class SetProtonTokenCall extends ethereum.Call {
  get inputs(): SetProtonTokenCall__Inputs {
    return new SetProtonTokenCall__Inputs(this);
  }

  get outputs(): SetProtonTokenCall__Outputs {
    return new SetProtonTokenCall__Outputs(this);
  }
}

export class SetProtonTokenCall__Inputs {
  _call: SetProtonTokenCall;

  constructor(call: SetProtonTokenCall) {
    this._call = call;
  }

  get _protonToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetProtonTokenCall__Outputs {
  _call: SetProtonTokenCall;

  constructor(call: SetProtonTokenCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
