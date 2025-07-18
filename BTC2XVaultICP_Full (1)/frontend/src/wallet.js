export async function connectPlugWallet() {
  if (!window.ic || !window.ic.plug) {
    throw new Error("Plug Wallet not found. Please install the Plug extension.");
  }

  const isConnected = await window.ic.plug.isConnected();
  if (!isConnected) {
    const connection = await window.ic.plug.requestConnect();
    if (!connection) {
      throw new Error("User rejected connection to Plug Wallet.");
    }
  }

  const principal = await window.ic.plug.getPrincipal();
  return principal.toText();
}
