import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Trie "mo:base/Trie";

actor BTCAcceleratorVault {

  type Epoch = {
    start: Int;
    end: Int;
    yieldRate: Nat; // e.g., 2% = 2
  };

  stable var totalDeposits : Nat = 0;
  stable var balances : Trie.Trie<Principal, Nat> = Trie.empty();
  stable var epoch: Epoch = {
    start = Time.now();
    end = Time.now() + 7 * 24 * 60 * 60 * 1_000_000_000; // 1 week
    yieldRate = 2; // default 2% yield per epoch
  };

  public func deposit(amount : Nat) : async Text {
    let caller = Principal.fromActor(this);
    balances := Trie.put(balances, caller, amount, func(a, b) = a + b);
    totalDeposits += amount;
    Debug.print("Deposited " # Nat.toText(amount));
    return "Deposit successful.";
  };

  public func withdraw() : async Text {
    let caller = Principal.fromActor(this);
    let currentTime = Time.now();
    if (currentTime < epoch.end) {
      return "Epoch not yet complete. Withdrawal not allowed.";
    };

    switch (Trie.get(balances, caller)) {
      case (null) { return "No balance found."; };
      case (?bal) {
        let yieldEarned = (bal * epoch.yieldRate) / 100;
        let total = bal + yieldEarned;
        totalDeposits -= bal;
        balances := Trie.put(balances, caller, 0, func(_, _) = 0);
        return "Withdrawn: " # Nat.toText(total) # " (including " # Nat.toText(yieldEarned) # " yield)";
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

  public query func getEpochInfo() : async Epoch {
    return epoch;
  };

  public func startNewEpoch(yieldRate: Nat) : async Text {
    epoch := {
      start = Time.now();
      end = Time.now() + 7 * 24 * 60 * 60 * 1_000_000_000;
      yieldRate = yieldRate;
    };
    return "New epoch started with yield rate " # Nat.toText(yieldRate) # "%.";
  };

};
