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

export class BasketAdd extends ethereum.Event {
  get params(): BasketAdd__Params {
    return new BasketAdd__Params(this);
  }
}

export class BasketAdd__Params {
  _event: BasketAdd;

  constructor(event: BasketAdd) {
    this._event = event;
  }

  get contractAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get basketTokenAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get basketTokenId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class BasketAdd1 extends ethereum.Event {
  get params(): BasketAdd1__Params {
    return new BasketAdd1__Params(this);
  }
}

export class BasketAdd1__Params {
  _event: BasketAdd1;

  constructor(event: BasketAdd1) {
    this._event = event;
  }

  get contractAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get basketTokenAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get basketTokenId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get basketTokenAmount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class BasketRemove extends ethereum.Event {
  get params(): BasketRemove__Params {
    return new BasketRemove__Params(this);
  }
}

export class BasketRemove__Params {
  _event: BasketRemove;

  constructor(event: BasketRemove) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get contractAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get basketTokenAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get basketTokenId(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class BasketRemove1 extends ethereum.Event {
  get params(): BasketRemove1__Params {
    return new BasketRemove1__Params(this);
  }
}

export class BasketRemove1__Params {
  _event: BasketRemove1;

  constructor(event: BasketRemove1) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get contractAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get basketTokenAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get basketTokenId(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get basketTokenAmount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class BasketRewarded extends ethereum.Event {
  get params(): BasketRewarded__Params {
    return new BasketRewarded__Params(this);
  }
}

export class BasketRewarded__Params {
  _event: BasketRewarded;

  constructor(event: BasketRewarded) {
    this._event = event;
  }

  get contractAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get receiver(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get rewardsToken(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get rewardsAmount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class ControllerSet extends ethereum.Event {
  get params(): ControllerSet__Params {
    return new ControllerSet__Params(this);
  }
}

export class ControllerSet__Params {
  _event: ControllerSet;

  constructor(event: ControllerSet) {
    this._event = event;
  }

  get controller(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ExecutorSet extends ethereum.Event {
  get params(): ExecutorSet__Params {
    return new ExecutorSet__Params(this);
  }
}

export class ExecutorSet__Params {
  _event: ExecutorSet;

  constructor(event: ExecutorSet) {
    this._event = event;
  }

  get executor(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class NewSmartBasket extends ethereum.Event {
  get params(): NewSmartBasket__Params {
    return new NewSmartBasket__Params(this);
  }
}

export class NewSmartBasket__Params {
  _event: NewSmartBasket;

  constructor(event: NewSmartBasket) {
    this._event = event;
  }

  get contractAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get smartBasket(): Address {
    return this._event.parameters[2].value.toAddress();
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

export class PausedStateSet extends ethereum.Event {
  get params(): PausedStateSet__Params {
    return new PausedStateSet__Params(this);
  }
}

export class PausedStateSet__Params {
  _event: PausedStateSet;

  constructor(event: PausedStateSet) {
    this._event = event;
  }

  get isPaused(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }
}

export class WithdrawStuckERC1155 extends ethereum.Event {
  get params(): WithdrawStuckERC1155__Params {
    return new WithdrawStuckERC1155__Params(this);
  }
}

export class WithdrawStuckERC1155__Params {
  _event: WithdrawStuckERC1155;

  constructor(event: WithdrawStuckERC1155) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class WithdrawStuckERC20 extends ethereum.Event {
  get params(): WithdrawStuckERC20__Params {
    return new WithdrawStuckERC20__Params(this);
  }
}

export class WithdrawStuckERC20__Params {
  _event: WithdrawStuckERC20;

  constructor(event: WithdrawStuckERC20) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WithdrawStuckERC721 extends ethereum.Event {
  get params(): WithdrawStuckERC721__Params {
    return new WithdrawStuckERC721__Params(this);
  }
}

export class WithdrawStuckERC721__Params {
  _event: WithdrawStuckERC721;

  constructor(event: WithdrawStuckERC721) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WithdrawStuckEther extends ethereum.Event {
  get params(): WithdrawStuckEther__Params {
    return new WithdrawStuckEther__Params(this);
  }
}

export class WithdrawStuckEther__Params {
  _event: WithdrawStuckEther;

  constructor(event: WithdrawStuckEther) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class GenericBasketManager extends ethereum.SmartContract {
  static bind(address: Address): GenericBasketManager {
    return new GenericBasketManager("GenericBasketManager", address);
  }

  addToBasket(
    contractAddress: Address,
    tokenId: BigInt,
    basketTokenAddress: Address,
    basketTokenId: BigInt
  ): boolean {
    let result = super.call(
      "addToBasket",
      "addToBasket(address,uint256,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(basketTokenAddress),
        ethereum.Value.fromUnsignedBigInt(basketTokenId)
      ]
    );

    return result[0].toBoolean();
  }

  try_addToBasket(
    contractAddress: Address,
    tokenId: BigInt,
    basketTokenAddress: Address,
    basketTokenId: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "addToBasket",
      "addToBasket(address,uint256,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(basketTokenAddress),
        ethereum.Value.fromUnsignedBigInt(basketTokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  executeForAccount(
    contractAddress: Address,
    tokenId: BigInt,
    externalAddress: Address,
    ethValue: BigInt,
    encodedParams: Bytes
  ): Bytes {
    let result = super.call(
      "executeForAccount",
      "executeForAccount(address,uint256,address,uint256,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(externalAddress),
        ethereum.Value.fromUnsignedBigInt(ethValue),
        ethereum.Value.fromBytes(encodedParams)
      ]
    );

    return result[0].toBytes();
  }

  try_executeForAccount(
    contractAddress: Address,
    tokenId: BigInt,
    externalAddress: Address,
    ethValue: BigInt,
    encodedParams: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "executeForAccount",
      "executeForAccount(address,uint256,address,uint256,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(externalAddress),
        ethereum.Value.fromUnsignedBigInt(ethValue),
        ethereum.Value.fromBytes(encodedParams)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getBasketAddressById(contractAddress: Address, tokenId: BigInt): Address {
    let result = super.call(
      "getBasketAddressById",
      "getBasketAddressById(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return result[0].toAddress();
  }

  try_getBasketAddressById(
    contractAddress: Address,
    tokenId: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getBasketAddressById",
      "getBasketAddressById(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getTokenCountByType(
    contractAddress: Address,
    tokenId: BigInt,
    basketTokenAddress: Address,
    basketTokenId: BigInt
  ): BigInt {
    let result = super.call(
      "getTokenCountByType",
      "getTokenCountByType(address,uint256,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(basketTokenAddress),
        ethereum.Value.fromUnsignedBigInt(basketTokenId)
      ]
    );

    return result[0].toBigInt();
  }

  try_getTokenCountByType(
    contractAddress: Address,
    tokenId: BigInt,
    basketTokenAddress: Address,
    basketTokenId: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenCountByType",
      "getTokenCountByType(address,uint256,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(basketTokenAddress),
        ethereum.Value.fromUnsignedBigInt(basketTokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenTotalCount(contractAddress: Address, tokenId: BigInt): BigInt {
    let result = super.call(
      "getTokenTotalCount",
      "getTokenTotalCount(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return result[0].toBigInt();
  }

  try_getTokenTotalCount(
    contractAddress: Address,
    tokenId: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenTotalCount",
      "getTokenTotalCount(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isPaused(): boolean {
    let result = super.call("isPaused", "isPaused():(bool)", []);

    return result[0].toBoolean();
  }

  try_isPaused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isPaused", "isPaused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
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

  removeFromBasket(
    receiver: Address,
    contractAddress: Address,
    tokenId: BigInt,
    basketTokenAddress: Address,
    basketTokenId: BigInt
  ): boolean {
    let result = super.call(
      "removeFromBasket",
      "removeFromBasket(address,address,uint256,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(receiver),
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(basketTokenAddress),
        ethereum.Value.fromUnsignedBigInt(basketTokenId)
      ]
    );

    return result[0].toBoolean();
  }

  try_removeFromBasket(
    receiver: Address,
    contractAddress: Address,
    tokenId: BigInt,
    basketTokenAddress: Address,
    basketTokenId: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "removeFromBasket",
      "removeFromBasket(address,address,uint256,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(receiver),
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(basketTokenAddress),
        ethereum.Value.fromUnsignedBigInt(basketTokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  withdrawRewards(
    receiver: Address,
    contractAddress: Address,
    tokenId: BigInt,
    rewardsToken: Address,
    rewardsAmount: BigInt
  ): BigInt {
    let result = super.call(
      "withdrawRewards",
      "withdrawRewards(address,address,uint256,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(receiver),
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(rewardsToken),
        ethereum.Value.fromUnsignedBigInt(rewardsAmount)
      ]
    );

    return result[0].toBigInt();
  }

  try_withdrawRewards(
    receiver: Address,
    contractAddress: Address,
    tokenId: BigInt,
    rewardsToken: Address,
    rewardsAmount: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "withdrawRewards",
      "withdrawRewards(address,address,uint256,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(receiver),
        ethereum.Value.fromAddress(contractAddress),
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromAddress(rewardsToken),
        ethereum.Value.fromUnsignedBigInt(rewardsAmount)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddToBasketCall extends ethereum.Call {
  get inputs(): AddToBasketCall__Inputs {
    return new AddToBasketCall__Inputs(this);
  }

  get outputs(): AddToBasketCall__Outputs {
    return new AddToBasketCall__Outputs(this);
  }
}

export class AddToBasketCall__Inputs {
  _call: AddToBasketCall;

  constructor(call: AddToBasketCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get basketTokenAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get basketTokenId(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class AddToBasketCall__Outputs {
  _call: AddToBasketCall;

  constructor(call: AddToBasketCall) {
    this._call = call;
  }

  get added(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class ExecuteForAccountCall extends ethereum.Call {
  get inputs(): ExecuteForAccountCall__Inputs {
    return new ExecuteForAccountCall__Inputs(this);
  }

  get outputs(): ExecuteForAccountCall__Outputs {
    return new ExecuteForAccountCall__Outputs(this);
  }
}

export class ExecuteForAccountCall__Inputs {
  _call: ExecuteForAccountCall;

  constructor(call: ExecuteForAccountCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get externalAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get ethValue(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get encodedParams(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class ExecuteForAccountCall__Outputs {
  _call: ExecuteForAccountCall;

  constructor(call: ExecuteForAccountCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class GetBasketAddressByIdCall extends ethereum.Call {
  get inputs(): GetBasketAddressByIdCall__Inputs {
    return new GetBasketAddressByIdCall__Inputs(this);
  }

  get outputs(): GetBasketAddressByIdCall__Outputs {
    return new GetBasketAddressByIdCall__Outputs(this);
  }
}

export class GetBasketAddressByIdCall__Inputs {
  _call: GetBasketAddressByIdCall;

  constructor(call: GetBasketAddressByIdCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class GetBasketAddressByIdCall__Outputs {
  _call: GetBasketAddressByIdCall;

  constructor(call: GetBasketAddressByIdCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class GetTokenCountByTypeCall extends ethereum.Call {
  get inputs(): GetTokenCountByTypeCall__Inputs {
    return new GetTokenCountByTypeCall__Inputs(this);
  }

  get outputs(): GetTokenCountByTypeCall__Outputs {
    return new GetTokenCountByTypeCall__Outputs(this);
  }
}

export class GetTokenCountByTypeCall__Inputs {
  _call: GetTokenCountByTypeCall;

  constructor(call: GetTokenCountByTypeCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get basketTokenAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get basketTokenId(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class GetTokenCountByTypeCall__Outputs {
  _call: GetTokenCountByTypeCall;

  constructor(call: GetTokenCountByTypeCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RemoveFromBasketCall extends ethereum.Call {
  get inputs(): RemoveFromBasketCall__Inputs {
    return new RemoveFromBasketCall__Inputs(this);
  }

  get outputs(): RemoveFromBasketCall__Outputs {
    return new RemoveFromBasketCall__Outputs(this);
  }
}

export class RemoveFromBasketCall__Inputs {
  _call: RemoveFromBasketCall;

  constructor(call: RemoveFromBasketCall) {
    this._call = call;
  }

  get receiver(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get contractAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get basketTokenAddress(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get basketTokenId(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class RemoveFromBasketCall__Outputs {
  _call: RemoveFromBasketCall;

  constructor(call: RemoveFromBasketCall) {
    this._call = call;
  }

  get removed(): boolean {
    return this._call.outputValues[0].value.toBoolean();
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

export class SetControllerCall extends ethereum.Call {
  get inputs(): SetControllerCall__Inputs {
    return new SetControllerCall__Inputs(this);
  }

  get outputs(): SetControllerCall__Outputs {
    return new SetControllerCall__Outputs(this);
  }
}

export class SetControllerCall__Inputs {
  _call: SetControllerCall;

  constructor(call: SetControllerCall) {
    this._call = call;
  }

  get controller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetControllerCall__Outputs {
  _call: SetControllerCall;

  constructor(call: SetControllerCall) {
    this._call = call;
  }
}

export class SetPausedStateCall extends ethereum.Call {
  get inputs(): SetPausedStateCall__Inputs {
    return new SetPausedStateCall__Inputs(this);
  }

  get outputs(): SetPausedStateCall__Outputs {
    return new SetPausedStateCall__Outputs(this);
  }
}

export class SetPausedStateCall__Inputs {
  _call: SetPausedStateCall;

  constructor(call: SetPausedStateCall) {
    this._call = call;
  }

  get paused(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class SetPausedStateCall__Outputs {
  _call: SetPausedStateCall;

  constructor(call: SetPausedStateCall) {
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

export class WithdrawERC1155Call extends ethereum.Call {
  get inputs(): WithdrawERC1155Call__Inputs {
    return new WithdrawERC1155Call__Inputs(this);
  }

  get outputs(): WithdrawERC1155Call__Outputs {
    return new WithdrawERC1155Call__Outputs(this);
  }
}

export class WithdrawERC1155Call__Inputs {
  _call: WithdrawERC1155Call;

  constructor(call: WithdrawERC1155Call) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get receiver(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get nftTokenAddress(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get nftTokenId(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class WithdrawERC1155Call__Outputs {
  _call: WithdrawERC1155Call;

  constructor(call: WithdrawERC1155Call) {
    this._call = call;
  }
}

export class WithdrawERC20Call extends ethereum.Call {
  get inputs(): WithdrawERC20Call__Inputs {
    return new WithdrawERC20Call__Inputs(this);
  }

  get outputs(): WithdrawERC20Call__Outputs {
    return new WithdrawERC20Call__Outputs(this);
  }
}

export class WithdrawERC20Call__Inputs {
  _call: WithdrawERC20Call;

  constructor(call: WithdrawERC20Call) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get receiver(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get tokenAddress(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class WithdrawERC20Call__Outputs {
  _call: WithdrawERC20Call;

  constructor(call: WithdrawERC20Call) {
    this._call = call;
  }
}

export class WithdrawERC721Call extends ethereum.Call {
  get inputs(): WithdrawERC721Call__Inputs {
    return new WithdrawERC721Call__Inputs(this);
  }

  get outputs(): WithdrawERC721Call__Outputs {
    return new WithdrawERC721Call__Outputs(this);
  }
}

export class WithdrawERC721Call__Inputs {
  _call: WithdrawERC721Call;

  constructor(call: WithdrawERC721Call) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get receiver(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get nftTokenAddress(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get nftTokenId(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class WithdrawERC721Call__Outputs {
  _call: WithdrawERC721Call;

  constructor(call: WithdrawERC721Call) {
    this._call = call;
  }
}

export class WithdrawEtherCall extends ethereum.Call {
  get inputs(): WithdrawEtherCall__Inputs {
    return new WithdrawEtherCall__Inputs(this);
  }

  get outputs(): WithdrawEtherCall__Outputs {
    return new WithdrawEtherCall__Outputs(this);
  }
}

export class WithdrawEtherCall__Inputs {
  _call: WithdrawEtherCall;

  constructor(call: WithdrawEtherCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get receiver(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class WithdrawEtherCall__Outputs {
  _call: WithdrawEtherCall;

  constructor(call: WithdrawEtherCall) {
    this._call = call;
  }
}

export class WithdrawRewardsCall extends ethereum.Call {
  get inputs(): WithdrawRewardsCall__Inputs {
    return new WithdrawRewardsCall__Inputs(this);
  }

  get outputs(): WithdrawRewardsCall__Outputs {
    return new WithdrawRewardsCall__Outputs(this);
  }
}

export class WithdrawRewardsCall__Inputs {
  _call: WithdrawRewardsCall;

  constructor(call: WithdrawRewardsCall) {
    this._call = call;
  }

  get receiver(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get contractAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get rewardsToken(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get rewardsAmount(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class WithdrawRewardsCall__Outputs {
  _call: WithdrawRewardsCall;

  constructor(call: WithdrawRewardsCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}
