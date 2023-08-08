import { useContext, useState } from "react";
import Context from "../Context";

import 'react-datepicker/dist/react-datepicker.css';

function AddTransaction() {

  const data = useContext(Context);


  return (
    <div className="AddTransaction-Container">
      <div> <h3>Add Transaction</h3></div>
      <form>
        <div className="inputs" > <label htmlFor="">Title:</label>
          <input type="text" placeholder="Enter Title" value={data.title} onChange={e => { data.settitle(e.target.value) }} /></div>
        <div className="inputs"> <label htmlFor="">Amount:</label>
          <input type="text" placeholder="Enter Amount" value={data.amount} onChange={e => { data.setamount(e.target.value) }} /></div>
        <div className="inputs"> <label htmlFor="">Date:</label>
          <input type="date" value={data.date} onChange={e => { data.setDate(e.target.value) }} /></div>
        <div className="AddTransactions-Button">
          <button type="submit" onClick={data.handleDataIncome} >Add Income</button>
          <button type="submit" onClick={data.handleDataExpenses} >Add Expenses</button></div>
      </form>
    </div>
  );
}

export default AddTransaction;

