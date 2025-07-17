import Debug "mo:base/Debug";

actor BTC2XVault {
  stable var totalDeposits: Nat = 0;

  public func deposit(amount: Nat): async Nat {
    totalDeposits += amount;
    Debug.print("Deposited " # debug_show(amount));
    return totalDeposits;
  }

  public query func getTotalDeposits(): async Nat {
    return totalDeposits;
  }
}