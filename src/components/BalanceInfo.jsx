import { useContext, useState, useEffect } from "react";
import Context from "../Context";

function BalanceInfo() {

  const data = useContext(Context);
  const income = data.income;
  const expenses = data.expenses;
  const remaining = income - expenses;

  return (
    <div className="balanceInfo-container">
      <div>Remaining Balance: <strong>{remaining}</strong></div>
      <div>Total Income:<strong style={{ color: "green" }}>{income}</strong> </div>
      <div>Total Expenses: <strong style={{ color: "red" }}>{expenses}</strong></div>
    </div>
  );
}

export default BalanceInfo;
