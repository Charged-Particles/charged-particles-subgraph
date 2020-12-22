

export function ionRewardsMultiplierId(universeAddress: string, assetTokenAddress: string): string {
  return universeAddress + '-' + assetTokenAddress;
}

export function nftCreatorSettingsId(contractAddress: string, tokenId: string, creatorAddress: string): string {
  return contractAddress + '-' + tokenId + '-' + creatorAddress;
}

export function chargedNftStateId(contractAddress: string, tokenId: string): string {
  return contractAddress + '-' + tokenId;
}

export function assetTokenBalanceId(assetTokenAddress: string, contractAddress: string, tokenId: string): string {
  return assetTokenAddress + '-' + contractAddress + '-' + tokenId;
}

export function smartWalletId(contractAddress: string, tokenId: string): string {
  return contractAddress + '-' + tokenId;
}

export function whitelistedNftContractId(chargedParticlesAdress: string, contractAddress: string): string {
  return chargedParticlesAdress + '-' + contractAddress;
}

export function tieredDepositFeeId(chargedParticlesAdress: string, limit: string): string {
  return chargedParticlesAdress + '-' + limit;
}

export function ionTokenHolderId(ionTokenAddress: string, holderAddress: string): string {
  return ionTokenAddress + '-' + holderAddress;
}

export function protonNftId(protonAddress: string, tokenId: string): string {
  return protonAddress + '-' + tokenId;
}

export function nftAttributeId(protonNftId: string, attrIndex: string): string {
  return protonNftId + '-' + attrIndex;
}
