

export function esaMultiplierId(universeAddress: string, assetTokenAddress: string): string {
  return universeAddress + '-' + assetTokenAddress;
}

export function esaLevelId(universeAddress: string, accountAddress: string): string {
  return universeAddress + '-' + accountAddress;
}

export function nftCreatorSettingsId(contractAddress: string, tokenId: string, creatorAddress: string): string {
  return contractAddress + '-' + tokenId + '-' + creatorAddress;
}

export function nftStateId(contractAddress: string, tokenId: string): string {
  return contractAddress + '-' + tokenId;
}

export function tokenBalanceId(tokenAddress: string, contractAddress: string, tokenId: string): string {
  return tokenAddress + '-' + contractAddress + '-' + tokenId;
}

export function smartWalletId(contractAddress: string, tokenId: string): string {
  return contractAddress + '-' + tokenId;
}

export function whitelistedNftContractId(chargedParticlesAdress: string, contractAddress: string): string {
  return chargedParticlesAdress + '-' + contractAddress;
}

export function ionxTokenHolderId(ionxTokenAddress: string, holderAddress: string): string {
  return ionxTokenAddress + '-' + holderAddress;
}

export function wBosonId(wBosonAddress: string, accountAddress: string): string {
  return wBosonAddress + '-' + accountAddress;
}

export function standardNftId(tokenAddress: string, tokenId: string): string {
  return tokenAddress + '-' + tokenId;
}

export function protonNftId(protonAddress: string, tokenId: string): string {
  return protonAddress + '-' + tokenId;
}

export function leptonNftId(leptonAddress: string, tokenId: string): string {
  return leptonAddress + '-' + tokenId;
}

export function leptonClassificationId(leptonAddress: string, typeId: string): string {
  return leptonAddress + '-' + typeId;
}

export function nftAttributeId(protonNftId: string, attrIndex: string): string {
  return protonNftId + '-' + attrIndex;
}

export function nftId(contractAddress: string, tokenId: string): string {
  return contractAddress + '-' + tokenId;
}

export function nftTxId(nftId: string, txHash: string, eventType: string): string {
  return nftId + '-' + txHash + '-' + eventType;
}

export function allowedAssetId(nftSettingsAddress: string, nftContractAddress: string, assetTokenAddress: string): string {
  return nftSettingsAddress + '-' + nftContractAddress + '-' + assetTokenAddress;
}

export function approvedOperatorId(assetAddress: string, ownerAddress: string): string {
  return assetAddress + '-' + ownerAddress;
}

export function depositCapId(chargedSettingsAddress: string, assetTokenAddress: string): string {
  return chargedSettingsAddress + '-' + assetTokenAddress;
}

export function maxNftsId(contractAddress: string, assetTokenAddress: string): string {
  return contractAddress + '-' + assetTokenAddress;
}

export function assetTokenId(assetTokenAddress: string): string {
  return assetTokenAddress;
}

export function profileMetricId(userAddress: string): string {
  return userAddress;
}

export function userTokenMetricId(userAddress: string, assetTokenAddress: string): string {
  return userAddress + '-' + assetTokenAddress;
}