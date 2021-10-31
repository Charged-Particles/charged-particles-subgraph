## Charged Particles Universe - Subgraph v1.2.25

[![Discord](https://badgen.net/badge/definft/Charged%20Particles?icon=discord&label=discord)](https://discord.gg/Syh3gjz)
[![Twitter Follow](https://badgen.net/twitter/follow/DeFiNFT?icon=twitter)](https://twitter.com/intent/follow?screen_name=DeFiNFT)

![GitHub last commit](https://img.shields.io/github/last-commit/Charged-Particles/charged-particles-subgraph)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Charged-Particles/charged-particles-subgraph)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Charged-Particles/charged-particles-subgraph)
![GitHub repo size](https://img.shields.io/github/repo-size/Charged-Particles/charged-particles-subgraph)

**Charged Particles** are Non-Fungible Tokens (NFTs) that are minted with an Underlying Asset (ex: **DAI**) and accrue interest via an Interest-bearing token (ex: **Aave's aDAI**) giving the Token a "Charge".

**Coming Soon**:

- Compound - cTokens
- mStable - mTokens
- yEarn - yTokens

---

#### Production Site (Beta, Ropsten Only)
- https://charged.fi

#### Documentation
- https://docs.charged.fi

---

#### Value
```text
Particle Value
  =
Intrinsic Value (underlying asset, DAI)
  +
Speculative Value (non-fungible rarity)
  +
Interest value (accrued in aDAI)
```

#### Value Appreciation
Imagine a Babe Ruth rookie card that was stuffed with $1 and earning interest since 1916!  The same might be true
of a Charged Particle NFT in 100 years!

#### Ownership
Charged Particles are non-custodial NFTs that can be "discharged" at any time by the owner, collecting the interest
from the token. And just like any NFT, they are yours trade, transfer, sell, etc.

They can also be burned (melted) to reclaim the underlying DAI + interest in full, destroying the token.
Charged Particles, therefore, always have an underlying value in DAI.

#### Custom Mechanics
Based on the amount of "charge" a token has, Smart Contracts and/or Dapps can decide how to handle the token - custom
mechanics can be designed around the level of "Charge" a token has.

Imagine an NFT that represents a Sword - the power of that sword could be dependant on the amount of "Charge" the token
has. Or perhaps certain items can only be used once they reach a certain level of charge.

Other possibilities include battling over the "charge" of a particle - the winner earns the interest from their
competitor's particles.  (Still trying to work this part out, ideas are welcome!)

#### Particle Accelerator
 - Fully-decentralized Public Particle Minting & Energizing Station

#### Feedback & Contributions
Feel free to fork and/or use in your own projects!

And, of course, contributions are always welcome!

#### Community
Join our community, share ideas and help support the project in anyway you want!

**Discord**: https://discord.gg/Cdv6zZMKEa

---

### Deploy:

  yarn auth [__your_access_token__]

  yarn clean && yarn prepare:kovan && yarn gen:kovan && yarn deploy:kovan-dev


See package.json for more scripts

---

_MIT License_

Copyright (c) 2021 Firma Lux, Inc. <https://charged.fi>
