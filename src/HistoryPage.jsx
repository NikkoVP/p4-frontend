import Header from './components/Header';
import Transactions from './components/Transactions';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useContext, useState, useEffect } from 'react';
import Context from './Context';

function HistoryPage() {

  const data = useContext(Context);
  const income = data.income;
  const expenses = data.expenses;
  const remaining = income - expenses;
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

    const response = await fetch(`https://pitaka-react-project-backend.onrender.com/users`)
    const { data } = await response.json();
    setDisplayName(data)
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <div><Header></Header></div>
      <div><ProgressBar>
        <ProgressBar variant='success' now={incomePercentage} key={1} />
        <ProgressBar variant="danger" now={expensesPercentage} key={2} />
      </ProgressBar></div>

      <Transactions value="0"></Transactions>
    </div>
  )
}

export default HistoryPage;