module {
  public type Epoch = {
    start: Time.Time;
    end: Time.Time;
    yieldRate: Nat;
  };

  public type EpochRecord = {
    epoch: Epoch;
    totalDeposits: Nat;
    notes: ?Text;
  };

  public type DepositResult = {
    #ok: Text;
    #err: Text;
  };

  public type WithdrawalResult = {
    #ok: {
      amount: Nat;
      yield: Nat;
    };
    #err: Text;
  };
};
