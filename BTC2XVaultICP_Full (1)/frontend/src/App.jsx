import React, { useEffect, useState } from 'react';
import { connectPlugWallet } from './wallet';
import { getVaultActor } from './agent';

const App = () => {
  const [userPrincipal, setUserPrincipal] = useState(null);
  const [actor, setActor] = useState(null);
  const [status, setStatus] = useState("Not connected");
  const [vaultBalance, setVaultBalance] = useState("0");
  const [epochInfo, setEpochInfo] = useState(null);

  const connect = async () => {
    try {
      const principal = await connectPlugWallet();
      setUserPrincipal(principal);
      const vaultActor = await getVaultActor();
      setActor(vaultActor);
      setStatus("Wallet connected!");
    } catch (err) {
      setStatus("Connection failed: " + err.message);
    }
  };

  const deposit = async () => {
    if (!actor) return setStatus("Actor not ready");
    try {
      const result = await actor.deposit(BigInt(100_000_000)); // 0.001 BTC
      setStatus("Deposit result: " + JSON.stringify(result));
      refresh();
    } catch (e) {
      setStatus("Deposit error: " + e.message);
    }
  };

  const withdraw = async () => {
    if (!actor) return setStatus("Actor not ready");
    try {
      const result = await actor.withdraw();
      setStatus("Withdraw result: " + JSON.stringify(result));
      refresh();
    } catch (e) {
      setStatus("Withdraw error: " + e.message);
    }
  };

  const refresh = async () => {
    if (!actor || !userPrincipal) return;
    try {
      const bal = await actor.getBalance(userPrincipal);
      const info = await actor.getEpochInfo();
      setVaultBalance(bal.toString());
      setEpochInfo(info);
    } catch (e) {
      setStatus("Refresh failed: " + e.message);
    }
  };

  useEffect(() => {
    if (actor && userPrincipal) {
      refresh();
    }
  }, [actor, userPrincipal]);

  return (
    <div className="p-4 text-white bg-zinc-900 min-h-screen">
      <h1 className="text-3xl mb-4 font-bold">BTC Accelerator Vault</h1>
      <p>Status: {status}</p>
      <p>Your Principal: {userPrincipal}</p>
      <p>Your Vault Balance: {vaultBalance} sats</p>
      {epochInfo && (
        <div className="mt-4">
          <h3 className="text-xl">Current Epoch</h3>
          <p>Start: {new Date(Number(epochInfo.start) / 1_000_000).toLocaleString()}</p>
          <p>End: {new Date(Number(epochInfo.end) / 1_000_000).toLocaleString()}</p>
          <p>Yield Rate: {epochInfo.yieldRate}%</p>
        </div>
      )}
      <div className="mt-6 space-x-2">
        <button onClick={connect} className="px-4 py-2 bg-blue-600 rounded">🔌 Connect Wallet</button>
        <button onClick={deposit} className="px-4 py-2 bg-green-600 rounded">💰 Deposit 0.001 BTC</button>
        <button onClick={withdraw} className="px-4 py-2 bg-red-600 rounded">📤 Withdraw</button>
        <button onClick={refresh} className="px-4 py-2 bg-yellow-600 rounded">🔄 Refresh</button>
      </div>
    </div>
  );
};

export default App;
