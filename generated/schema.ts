// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Universe extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Universe entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Universe entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Universe", id.toString(), this);
  }

  static load(id: string): Universe | null {
    return store.get("Universe", id) as Universe | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get chargedParticles(): string | null {
    let value = this.get("chargedParticles");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set chargedParticles(value: string | null) {
    if (value === null) {
      this.unset("chargedParticles");
    } else {
      this.set("chargedParticles", Value.fromString(value as string));
    }
  }

  get ionToken(): string | null {
    let value = this.get("ionToken");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set ionToken(value: string | null) {
    if (value === null) {
      this.unset("ionToken");
    } else {
      this.set("ionToken", Value.fromString(value as string));
    }
  }

  get ionRewardsMultiplier(): Array<string> {
    let value = this.get("ionRewardsMultiplier");
    return value.toStringArray();
  }

  set ionRewardsMultiplier(value: Array<string>) {
    this.set("ionRewardsMultiplier", Value.fromStringArray(value));
  }
}

export class ChargedParticles extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ChargedParticles entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ChargedParticles entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ChargedParticles", id.toString(), this);
  }

  static load(id: string): ChargedParticles | null {
    return store.get("ChargedParticles", id) as ChargedParticles | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get universe(): string | null {
    let value = this.get("universe");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set universe(value: string | null) {
    if (value === null) {
      this.unset("universe");
    } else {
      this.set("universe", Value.fromString(value as string));
    }
  }

  get whitelisted(): Array<string> {
    let value = this.get("whitelisted");
    return value.toStringArray();
  }

  set whitelisted(value: Array<string>) {
    this.set("whitelisted", Value.fromStringArray(value));
  }

  get depositFee(): BigInt | null {
    let value = this.get("depositFee");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set depositFee(value: BigInt | null) {
    if (value === null) {
      this.unset("depositFee");
    } else {
      this.set("depositFee", Value.fromBigInt(value as BigInt));
    }
  }

  get externalContractSettings(): Array<string> {
    let value = this.get("externalContractSettings");
    return value.toStringArray();
  }

  set externalContractSettings(value: Array<string>) {
    this.set("externalContractSettings", Value.fromStringArray(value));
  }

  get nftCreatorSettings(): Array<string> {
    let value = this.get("nftCreatorSettings");
    return value.toStringArray();
  }

  set nftCreatorSettings(value: Array<string>) {
    this.set("nftCreatorSettings", Value.fromStringArray(value));
  }

  get chargedNftState(): Array<string> {
    let value = this.get("chargedNftState");
    return value.toStringArray();
  }

  set chargedNftState(value: Array<string>) {
    this.set("chargedNftState", Value.fromStringArray(value));
  }

  get aaveWalletManager(): string | null {
    let value = this.get("aaveWalletManager");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set aaveWalletManager(value: string | null) {
    if (value === null) {
      this.unset("aaveWalletManager");
    } else {
      this.set("aaveWalletManager", Value.fromString(value as string));
    }
  }
}

export class ExternalContractSettings extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save ExternalContractSettings entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ExternalContractSettings entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ExternalContractSettings", id.toString(), this);
  }

  static load(id: string): ExternalContractSettings | null {
    return store.get(
      "ExternalContractSettings",
      id
    ) as ExternalContractSettings | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get chargedParticles(): string {
    let value = this.get("chargedParticles");
    return value.toString();
  }

  set chargedParticles(value: string) {
    this.set("chargedParticles", Value.fromString(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get liquidityProvider(): Bytes | null {
    let value = this.get("liquidityProvider");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set liquidityProvider(value: Bytes | null) {
    if (value === null) {
      this.unset("liquidityProvider");
    } else {
      this.set("liquidityProvider", Value.fromBytes(value as Bytes));
    }
  }

  get assetDepositFee(): BigInt | null {
    let value = this.get("assetDepositFee");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set assetDepositFee(value: BigInt | null) {
    if (value === null) {
      this.unset("assetDepositFee");
    } else {
      this.set("assetDepositFee", Value.fromBigInt(value as BigInt));
    }
  }

  get assetDepositMin(): BigInt | null {
    let value = this.get("assetDepositMin");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set assetDepositMin(value: BigInt | null) {
    if (value === null) {
      this.unset("assetDepositMin");
    } else {
      this.set("assetDepositMin", Value.fromBigInt(value as BigInt));
    }
  }

  get assetDepositMax(): BigInt | null {
    let value = this.get("assetDepositMax");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set assetDepositMax(value: BigInt | null) {
    if (value === null) {
      this.unset("assetDepositMax");
    } else {
      this.set("assetDepositMax", Value.fromBigInt(value as BigInt));
    }
  }
}

export class NftCreatorSettings extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save NftCreatorSettings entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save NftCreatorSettings entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("NftCreatorSettings", id.toString(), this);
  }

  static load(id: string): NftCreatorSettings | null {
    return store.get("NftCreatorSettings", id) as NftCreatorSettings | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get chargedParticles(): string {
    let value = this.get("chargedParticles");
    return value.toString();
  }

  set chargedParticles(value: string) {
    this.set("chargedParticles", Value.fromString(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get creatorAddress(): Bytes {
    let value = this.get("creatorAddress");
    return value.toBytes();
  }

  set creatorAddress(value: Bytes) {
    this.set("creatorAddress", Value.fromBytes(value));
  }

  get annuityPercent(): BigInt | null {
    let value = this.get("annuityPercent");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set annuityPercent(value: BigInt | null) {
    if (value === null) {
      this.unset("annuityPercent");
    } else {
      this.set("annuityPercent", Value.fromBigInt(value as BigInt));
    }
  }

  get burnToRelease(): boolean {
    let value = this.get("burnToRelease");
    return value.toBoolean();
  }

  set burnToRelease(value: boolean) {
    this.set("burnToRelease", Value.fromBoolean(value));
  }
}

export class ChargedNftState extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ChargedNftState entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ChargedNftState entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ChargedNftState", id.toString(), this);
  }

  static load(id: string): ChargedNftState | null {
    return store.get("ChargedNftState", id) as ChargedNftState | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get chargedParticles(): string {
    let value = this.get("chargedParticles");
    return value.toString();
  }

  set chargedParticles(value: string) {
    this.set("chargedParticles", Value.fromString(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get lastKnownOwner(): Bytes | null {
    let value = this.get("lastKnownOwner");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set lastKnownOwner(value: Bytes | null) {
    if (value === null) {
      this.unset("lastKnownOwner");
    } else {
      this.set("lastKnownOwner", Value.fromBytes(value as Bytes));
    }
  }

  get dischargeApproval(): Bytes | null {
    let value = this.get("dischargeApproval");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set dischargeApproval(value: Bytes | null) {
    if (value === null) {
      this.unset("dischargeApproval");
    } else {
      this.set("dischargeApproval", Value.fromBytes(value as Bytes));
    }
  }

  get releaseApproval(): Bytes | null {
    let value = this.get("releaseApproval");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set releaseApproval(value: Bytes | null) {
    if (value === null) {
      this.unset("releaseApproval");
    } else {
      this.set("releaseApproval", Value.fromBytes(value as Bytes));
    }
  }

  get timelockApproval(): Bytes | null {
    let value = this.get("timelockApproval");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set timelockApproval(value: Bytes | null) {
    if (value === null) {
      this.unset("timelockApproval");
    } else {
      this.set("timelockApproval", Value.fromBytes(value as Bytes));
    }
  }

  get dischargeTimelock(): BigInt | null {
    let value = this.get("dischargeTimelock");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set dischargeTimelock(value: BigInt | null) {
    if (value === null) {
      this.unset("dischargeTimelock");
    } else {
      this.set("dischargeTimelock", Value.fromBigInt(value as BigInt));
    }
  }

  get releaseTimelock(): BigInt | null {
    let value = this.get("releaseTimelock");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set releaseTimelock(value: BigInt | null) {
    if (value === null) {
      this.unset("releaseTimelock");
    } else {
      this.set("releaseTimelock", Value.fromBigInt(value as BigInt));
    }
  }

  get assetToBeReleasedBy(): Bytes | null {
    let value = this.get("assetToBeReleasedBy");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set assetToBeReleasedBy(value: Bytes | null) {
    if (value === null) {
      this.unset("assetToBeReleasedBy");
    } else {
      this.set("assetToBeReleasedBy", Value.fromBytes(value as Bytes));
    }
  }
}

export class WhitelistedNftContract extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save WhitelistedNftContract entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save WhitelistedNftContract entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("WhitelistedNftContract", id.toString(), this);
  }

  static load(id: string): WhitelistedNftContract | null {
    return store.get(
      "WhitelistedNftContract",
      id
    ) as WhitelistedNftContract | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get chargedParticles(): string {
    let value = this.get("chargedParticles");
    return value.toString();
  }

  set chargedParticles(value: string) {
    this.set("chargedParticles", Value.fromString(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get state(): boolean {
    let value = this.get("state");
    return value.toBoolean();
  }

  set state(value: boolean) {
    this.set("state", Value.fromBoolean(value));
  }
}

export class AaveWalletManager extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save AaveWalletManager entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AaveWalletManager entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AaveWalletManager", id.toString(), this);
  }

  static load(id: string): AaveWalletManager | null {
    return store.get("AaveWalletManager", id) as AaveWalletManager | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get paused(): boolean {
    let value = this.get("paused");
    return value.toBoolean();
  }

  set paused(value: boolean) {
    this.set("paused", Value.fromBoolean(value));
  }

  get chargedParticles(): Bytes | null {
    let value = this.get("chargedParticles");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set chargedParticles(value: Bytes | null) {
    if (value === null) {
      this.unset("chargedParticles");
    } else {
      this.set("chargedParticles", Value.fromBytes(value as Bytes));
    }
  }

  get aaveBridge(): Bytes | null {
    let value = this.get("aaveBridge");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set aaveBridge(value: Bytes | null) {
    if (value === null) {
      this.unset("aaveBridge");
    } else {
      this.set("aaveBridge", Value.fromBytes(value as Bytes));
    }
  }

  get wallets(): Array<string> {
    let value = this.get("wallets");
    return value.toStringArray();
  }

  set wallets(value: Array<string>) {
    this.set("wallets", Value.fromStringArray(value));
  }
}

export class AaveSmartWallet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save AaveSmartWallet entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AaveSmartWallet entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AaveSmartWallet", id.toString(), this);
  }

  static load(id: string): AaveSmartWallet | null {
    return store.get("AaveSmartWallet", id) as AaveSmartWallet | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenUuid(): BigInt {
    let value = this.get("tokenUuid");
    return value.toBigInt();
  }

  set tokenUuid(value: BigInt) {
    this.set("tokenUuid", Value.fromBigInt(value));
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (value === null) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(value as Bytes));
    }
  }

  get walletManager(): string | null {
    let value = this.get("walletManager");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set walletManager(value: string | null) {
    if (value === null) {
      this.unset("walletManager");
    } else {
      this.set("walletManager", Value.fromString(value as string));
    }
  }

  get assetTokens(): Array<Bytes> | null {
    let value = this.get("assetTokens");
    if (value === null) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set assetTokens(value: Array<Bytes> | null) {
    if (value === null) {
      this.unset("assetTokens");
    } else {
      this.set("assetTokens", Value.fromBytesArray(value as Array<Bytes>));
    }
  }

  get nftCreator(): Bytes | null {
    let value = this.get("nftCreator");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set nftCreator(value: Bytes | null) {
    if (value === null) {
      this.unset("nftCreator");
    } else {
      this.set("nftCreator", Value.fromBytes(value as Bytes));
    }
  }

  get nftCreatorAnnuityPct(): BigInt | null {
    let value = this.get("nftCreatorAnnuityPct");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set nftCreatorAnnuityPct(value: BigInt | null) {
    if (value === null) {
      this.unset("nftCreatorAnnuityPct");
    } else {
      this.set("nftCreatorAnnuityPct", Value.fromBigInt(value as BigInt));
    }
  }

  get assetBalances(): Array<string> {
    let value = this.get("assetBalances");
    return value.toStringArray();
  }

  set assetBalances(value: Array<string>) {
    this.set("assetBalances", Value.fromStringArray(value));
  }
}

export class AaveAssetTokenBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save AaveAssetTokenBalance entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AaveAssetTokenBalance entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AaveAssetTokenBalance", id.toString(), this);
  }

  static load(id: string): AaveAssetTokenBalance | null {
    return store.get(
      "AaveAssetTokenBalance",
      id
    ) as AaveAssetTokenBalance | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get assetToken(): Bytes {
    let value = this.get("assetToken");
    return value.toBytes();
  }

  set assetToken(value: Bytes) {
    this.set("assetToken", Value.fromBytes(value));
  }

  get tokenUuid(): BigInt {
    let value = this.get("tokenUuid");
    return value.toBigInt();
  }

  set tokenUuid(value: BigInt) {
    this.set("tokenUuid", Value.fromBigInt(value));
  }

  get smartWallet(): string | null {
    let value = this.get("smartWallet");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set smartWallet(value: string | null) {
    if (value === null) {
      this.unset("smartWallet");
    } else {
      this.set("smartWallet", Value.fromString(value as string));
    }
  }

  get principal(): BigInt {
    let value = this.get("principal");
    return value.toBigInt();
  }

  set principal(value: BigInt) {
    this.set("principal", Value.fromBigInt(value));
  }

  get ownerInterestDischarged(): BigInt {
    let value = this.get("ownerInterestDischarged");
    return value.toBigInt();
  }

  set ownerInterestDischarged(value: BigInt) {
    this.set("ownerInterestDischarged", Value.fromBigInt(value));
  }

  get creatorInterestDischarged(): BigInt {
    let value = this.get("creatorInterestDischarged");
    return value.toBigInt();
  }

  set creatorInterestDischarged(value: BigInt) {
    this.set("creatorInterestDischarged", Value.fromBigInt(value));
  }
}

export class Ion extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Ion entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Ion entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Ion", id.toString(), this);
  }

  static load(id: string): Ion | null {
    return store.get("Ion", id) as Ion | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get universe(): string | null {
    let value = this.get("universe");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set universe(value: string | null) {
    if (value === null) {
      this.unset("universe");
    } else {
      this.set("universe", Value.fromString(value as string));
    }
  }

  get holders(): Array<string> {
    let value = this.get("holders");
    return value.toStringArray();
  }

  set holders(value: Array<string>) {
    this.set("holders", Value.fromStringArray(value));
  }
}

export class IonHolder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save IonHolder entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save IonHolder entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("IonHolder", id.toString(), this);
  }

  static load(id: string): IonHolder | null {
    return store.get("IonHolder", id) as IonHolder | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ion(): string {
    let value = this.get("ion");
    return value.toString();
  }

  set ion(value: string) {
    this.set("ion", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }
}

export class IonRewardsMultiplier extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save IonRewardsMultiplier entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save IonRewardsMultiplier entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("IonRewardsMultiplier", id.toString(), this);
  }

  static load(id: string): IonRewardsMultiplier | null {
    return store.get("IonRewardsMultiplier", id) as IonRewardsMultiplier | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get universe(): string {
    let value = this.get("universe");
    return value.toString();
  }

  set universe(value: string) {
    this.set("universe", Value.fromString(value));
  }

  get assetToken(): Bytes {
    let value = this.get("assetToken");
    return value.toBytes();
  }

  set assetToken(value: Bytes) {
    this.set("assetToken", Value.fromBytes(value));
  }

  get multiplier(): BigInt {
    let value = this.get("multiplier");
    return value.toBigInt();
  }

  set multiplier(value: BigInt) {
    this.set("multiplier", Value.fromBigInt(value));
  }
}

export class Proton extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Proton entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Proton entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Proton", id.toString(), this);
  }

  static load(id: string): Proton | null {
    return store.get("Proton", id) as Proton | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get chargedParticles(): string | null {
    let value = this.get("chargedParticles");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set chargedParticles(value: string | null) {
    if (value === null) {
      this.unset("chargedParticles");
    } else {
      this.set("chargedParticles", Value.fromString(value as string));
    }
  }

  get tokens(): Array<string> {
    let value = this.get("tokens");
    return value.toStringArray();
  }

  set tokens(value: Array<string>) {
    this.set("tokens", Value.fromStringArray(value));
  }
}

export class ProtonNFT extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ProtonNFT entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ProtonNFT entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ProtonNFT", id.toString(), this);
  }

  static load(id: string): ProtonNFT | null {
    return store.get("ProtonNFT", id) as ProtonNFT | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get proton(): string | null {
    let value = this.get("proton");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set proton(value: string | null) {
    if (value === null) {
      this.unset("proton");
    } else {
      this.set("proton", Value.fromString(value as string));
    }
  }

  get creator(): Bytes | null {
    let value = this.get("creator");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set creator(value: Bytes | null) {
    if (value === null) {
      this.unset("creator");
    } else {
      this.set("creator", Value.fromBytes(value as Bytes));
    }
  }

  get owner(): Bytes | null {
    let value = this.get("owner");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set owner(value: Bytes | null) {
    if (value === null) {
      this.unset("owner");
    } else {
      this.set("owner", Value.fromBytes(value as Bytes));
    }
  }

  get particleType(): string | null {
    let value = this.get("particleType");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set particleType(value: string | null) {
    if (value === null) {
      this.unset("particleType");
    } else {
      this.set("particleType", Value.fromString(value as string));
    }
  }

  get creatorAnnuity(): BigInt | null {
    let value = this.get("creatorAnnuity");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set creatorAnnuity(value: BigInt | null) {
    if (value === null) {
      this.unset("creatorAnnuity");
    } else {
      this.set("creatorAnnuity", Value.fromBigInt(value as BigInt));
    }
  }

  get burnToRelease(): boolean {
    let value = this.get("burnToRelease");
    return value.toBoolean();
  }

  set burnToRelease(value: boolean) {
    this.set("burnToRelease", Value.fromBoolean(value));
  }

  get metadataUri(): string | null {
    let value = this.get("metadataUri");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metadataUri(value: string | null) {
    if (value === null) {
      this.unset("metadataUri");
    } else {
      this.set("metadataUri", Value.fromString(value as string));
    }
  }

  get metaName(): string | null {
    let value = this.get("metaName");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metaName(value: string | null) {
    if (value === null) {
      this.unset("metaName");
    } else {
      this.set("metaName", Value.fromString(value as string));
    }
  }

  get metaDescription(): string | null {
    let value = this.get("metaDescription");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metaDescription(value: string | null) {
    if (value === null) {
      this.unset("metaDescription");
    } else {
      this.set("metaDescription", Value.fromString(value as string));
    }
  }

  get metaExternalUrl(): string | null {
    let value = this.get("metaExternalUrl");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metaExternalUrl(value: string | null) {
    if (value === null) {
      this.unset("metaExternalUrl");
    } else {
      this.set("metaExternalUrl", Value.fromString(value as string));
    }
  }

  get metaAnimationUrl(): string | null {
    let value = this.get("metaAnimationUrl");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metaAnimationUrl(value: string | null) {
    if (value === null) {
      this.unset("metaAnimationUrl");
    } else {
      this.set("metaAnimationUrl", Value.fromString(value as string));
    }
  }

  get metaYoutubeUrl(): string | null {
    let value = this.get("metaYoutubeUrl");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metaYoutubeUrl(value: string | null) {
    if (value === null) {
      this.unset("metaYoutubeUrl");
    } else {
      this.set("metaYoutubeUrl", Value.fromString(value as string));
    }
  }

  get metaIcon(): string | null {
    let value = this.get("metaIcon");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metaIcon(value: string | null) {
    if (value === null) {
      this.unset("metaIcon");
    } else {
      this.set("metaIcon", Value.fromString(value as string));
    }
  }

  get metaImage(): string | null {
    let value = this.get("metaImage");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metaImage(value: string | null) {
    if (value === null) {
      this.unset("metaImage");
    } else {
      this.set("metaImage", Value.fromString(value as string));
    }
  }

  get metaSymbol(): string | null {
    let value = this.get("metaSymbol");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metaSymbol(value: string | null) {
    if (value === null) {
      this.unset("metaSymbol");
    } else {
      this.set("metaSymbol", Value.fromString(value as string));
    }
  }

  get metaDecimals(): BigInt | null {
    let value = this.get("metaDecimals");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set metaDecimals(value: BigInt | null) {
    if (value === null) {
      this.unset("metaDecimals");
    } else {
      this.set("metaDecimals", Value.fromBigInt(value as BigInt));
    }
  }

  get metaBgColor(): string | null {
    let value = this.get("metaBgColor");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metaBgColor(value: string | null) {
    if (value === null) {
      this.unset("metaBgColor");
    } else {
      this.set("metaBgColor", Value.fromString(value as string));
    }
  }

  get metaAttributes(): Array<string> {
    let value = this.get("metaAttributes");
    return value.toStringArray();
  }

  set metaAttributes(value: Array<string>) {
    this.set("metaAttributes", Value.fromStringArray(value));
  }
}

export class NFTAttributes extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save NFTAttributes entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save NFTAttributes entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("NFTAttributes", id.toString(), this);
  }

  static load(id: string): NFTAttributes | null {
    return store.get("NFTAttributes", id) as NFTAttributes | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get protonNft(): string {
    let value = this.get("protonNft");
    return value.toString();
  }

  set protonNft(value: string) {
    this.set("protonNft", Value.fromString(value));
  }

  get name(): string | null {
    let value = this.get("name");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (value === null) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(value as string));
    }
  }

  get value(): string | null {
    let value = this.get("value");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set value(value: string | null) {
    if (value === null) {
      this.unset("value");
    } else {
      this.set("value", Value.fromString(value as string));
    }
  }
}
