# BTC Options Accelerator Vault

## 🧠 Summary
BTC2XVault is a non-custodial, BTC-denominated vault protocol that combines options selling, futures overlays, and protective puts to generate consistent BTC yield. It operates on a no-lock, epoch-based system and aims to double user capital in rising BTC markets while limiting downside exposure.

## 🚀 Features
- BTC-native yield
- Weekly/monthly epochs
- Call spreads + protective puts + long futures
- No lock-in (rolling entry/exit)
- ICP smart contract backend

## 🛠️ Setup
```bash
dfx start --background
dfx deploy
npm install && npm run dev
```

## 📦 Structure
- backend/ - Motoko canisters
- frontend/ - React frontend with wallet support
- scripts/ - testnet deployment
