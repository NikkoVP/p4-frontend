import Header from './components/Header';
import BalanceInfo from './components/BalanceInfo';
import AddTransaction from './components/AddTransaction';
import Transactions from './components/Transactions';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useContext, useEffect, useState } from 'react';
import Context from './Context';

function Homepage() {

  const data = useContext(Context);
  const income = data.income;
  const expenses = data.expenses;
  const total = income + expenses;
  const incomePercentage = ((income - expenses) / income) * 100;
  const expensesPercentage = 100 - incomePercentage;
  const user = localStorage.getItem('UserID');
  const [displayName, setDisplayName] = useState([]);
  const name = displayName.filter((showname) => {
    if (showname._id === user) {
      return showname;
    }
  })
  const fetchData = async () => {

    const response = await fetch(`http://127.0.0.1:3000/users`)
    const { data } = await response.json();
    setDisplayName(data)
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div style={{ width: "100%" }}>
      <div><Header></Header></div>
      <div><ProgressBar>
        <ProgressBar variant='success' now={incomePercentage} key={1} />
        <ProgressBar variant="danger" now={expensesPercentage} key={2} />
      </ProgressBar></div>

      <div className='data-Homepage'>

        <div className='balance-Add'>
          <div className='name'>Hello {name.map((data) => data.name)}</div>
          <div className='balanceAndAdd'>
            <div style={{ textAlign: "center", alignContent: "center" }}><BalanceInfo></BalanceInfo></div>
            <div><AddTransaction></AddTransaction></div>
          </div>
        </div>
        <div><Transactions value="-5" actionDisplay='none'></Transactions></div>
      </div>
    </div>
  );
}

export default Homepage;