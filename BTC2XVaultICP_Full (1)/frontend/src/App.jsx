import React, { useState, useEffect } from 'react';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [userPrincipal, setUserPrincipal] = useState('');
  const [vaultBalance, setVaultBalance] = useState('0');
  const [epochInfo, setEpochInfo] = useState({ start: '', end: '', yieldRate: 0 });

  const connectWallet = () => {
    // Placeholder connection logic
    setUserPrincipal('aaaaa-aa');
    setWalletConnected(true);
  };

  useEffect(() => {
    if (walletConnected) {
      // Placeholder: fetch vault data here from canister
      setVaultBalance('1.25');
      setEpochInfo({
        start: 'Jul 1, 2025',
        end: 'Jul 8, 2025',
        yieldRate: 2
      });
    }
  }, [walletConnected]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🚀 BTC Accelerator Vault</h1>

      {!walletConnected ? (
        <button onClick={connectWallet} style={{ padding: '10px 20px', marginTop: '1rem' }}>
          Connect Wallet
        </button>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <p><strong>Wallet:</strong> {userPrincipal}</p>
          <p><strong>Your Vault Balance:</strong> {vaultBalance} BTC</p>
          <p><strong>Epoch:</strong> {epochInfo.start} → {epochInfo.end}</p>
          <p><strong>Simulated Yield:</strong> {epochInfo.yieldRate}%</p>

          <button style={{ marginTop: '1rem' }}>Deposit BTC</button>
          <button style={{ marginLeft: '1rem' }}>Withdraw</button>
        </div>
      )}
    </div>
  );
}
