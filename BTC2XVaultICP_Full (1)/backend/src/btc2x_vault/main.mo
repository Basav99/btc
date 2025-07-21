import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Trie "mo:base/Trie";
import Array "mo:base/Array";
import Types "./types";

actor BTCAcceleratorVault {

  stable var totalDeposits : Nat = 0;
  stable var balances : Trie.Trie<Principal, Nat> = Trie.empty();

  stable var epoch: Types.Epoch = {
    start = Time.now();
    end = Time.now() + 7 * 24 * 60 * 60 * 1_000_000_000;
    yieldRate = 2;
  };

  stable var epochHistory: [Types.EpochRecord] = [];

  public func deposit(amount : Nat) : async Types.DepositResult {
    let caller = Principal.fromActor(this);
    balances := Trie.put(balances, caller, amount, func(a, b) = a + b);
    totalDeposits += amount;
    Debug.print("Deposited " # Nat.toText(amount));
    return #ok("Deposit successful.");
  };

  public func withdraw() : async Types.WithdrawalResult {
    let caller = Principal.fromActor(this);
    let currentTime = Time.now();

    if (currentTime < epoch.end) {
      return #err("Epoch not yet complete.");
    };

    switch (Trie.get(balances, caller)) {
      case (null) {
        return #err("No balance.");
      };
      case (?bal) {
        let yieldEarned = (bal * epoch.yieldRate) / 100;
        let total = bal + yieldEarned;
        balances := Trie.put(balances, caller, 0, func(_, _) = 0);
        totalDeposits -= bal;
        return #ok({ amount = total; yield = yieldEarned });
      };
    };
  };

  public query func getBalance(p : Principal) : async Nat {
    switch (Trie.get(balances, p)) {
      case (null) 0;
      case (?bal) bal;
    }
  };

  public query func getTotalDeposits() : async Nat {
    return totalDeposits;
  };

  public query func getEpochInfo() : async Types.Epoch {
    return epoch;
  };

  public func startNewEpoch(yieldRate: Nat) : async Text {
    let snapshot: Types.EpochRecord = {
      epoch = epoch;
      totalDeposits = totalDeposits;
      notes = null;
    };
    epochHistory := Array.append(epochHistory, [snapshot]);

    epoch := {
      start = Time.now();
      end = Time.now() + 7 * 24 * 60 * 60 * 1_000_000_000;
      yieldRate = yieldRate;
    };
    return "New epoch started with yield rate " # Nat.toText(yieldRate) # "%.";
  };

  public query func getEpochHistory() : async [Types.EpochRecord] {
    return epochHistory;
  };
};
