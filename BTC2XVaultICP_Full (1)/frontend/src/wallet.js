export const connectPlugWallet = async () => {
  if (!window.ic || !window.ic.plug) {
    throw new Error("Plug Wallet not available");
  }

  const isConnected = await window.ic.plug.isConnected();
  if (!isConnected) {
    await window.ic.plug.requestConnect();
  }

  const principal = await window.ic.plug.getPrincipal();
  return principal.toText();
};
