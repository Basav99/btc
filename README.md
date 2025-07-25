# BTC2x Vault – Structured BTC Yield Vault on ICP

BTC2x Vault is a fully on-chain smart contract system that allows Bitcoin holders to deposit BTC and gain structured upside through a vault that uses a combination of BTC options, futures, and passive exposure. The vault is designed to double user BTC if BTC appreciates 40%+, while protecting downside in flat or modestly bearish markets.

---

## 🌐 Live Demo

🧪 Testnet Canister ID: `btc2x_vault`  
📍 Frontend URL: _[Coming Soon via Vercel/Fleek]_  
🎥 Demo Video: Coming Soon

---

## 🚀 Features

- ✅ No Lock-In Epoch-Based Vault
- 📈 2x BTC Return if BTC rises by 40%+
- 📉 Partial downside protection
- ⚙️ Smart contract logic in Motoko
- 🧩 Option selling, futures overlays, capital rotation
- 🔐 On-chain, trustless, and composable

---

## 🧱 Architecture Overview

```mermaid
graph TD;
  User --> Frontend;
  Frontend --> Vault_Canister;
  Vault_Canister --> EpochEngine;
  EpochEngine --> OptionsEngine;
  EpochEngine --> FuturesEngine;
  Vault_Canister --> Oracle;
