import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../.dfx/ic/canisters/btc2x_vault";
import { canisterId } from "../../../.dfx/ic/canisters/btc2x_vault";

export async function getVaultActor() {
  const whitelist = [canisterId];

  if (!window.ic.plug) {
    throw new Error("Plug Wallet not found.");
  }

  const connected = await window.ic.plug.requestConnect({ whitelist });

  if (!connected) {
    throw new Error("User rejected Plug Wallet.");
  }

  const agent = await window.ic.plug.createAgent({ whitelist });
  const actor = await window.ic.plug.createActor({
    canisterId,
    interfaceFactory: idlFactory,
  });

  return actor;
}
