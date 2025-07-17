module {
  public type Epoch = {
    start: Int;
    end: Int;
    yieldRate: Nat;
  };

  public type DepositResult = {
    #ok: Text;
    #err: Text;
  };

  public type WithdrawalResult = {
    #ok: { amount: Nat; yield: Nat };
    #err: Text;
  };
}
