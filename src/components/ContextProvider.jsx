
import Context from "../Context";
import { useState, useEffect } from "react";

function ContextProvider({ children }) {

  const [title, settitle] = useState('');
  const [amount, setamount] = useState('');
  const [date, setDate] = useState('');
  const [info, setinfo] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  // Get Total Income
  useEffect(() => {
    if (localStorage.getItem("UserID") !== null) {
      const user = localStorage.getItem('UserID');
      fetch(`https://pitaka-react-project-backend.onrender.com/transactions/income/${user}`)
        .then((response) => response.json())
        .then((data) => {
          setIncome(data.totalAmount);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // Get Total Expenses
  useEffect(() => {
    if (localStorage.getItem("UserID") !== null) {
      const user = localStorage.getItem('UserID');
      fetch(`https://pitaka-react-project-backend.onrender.com/transactions/expenses/${user}`)
        .then((response) => response.json())
        .then((data) => {
          setExpenses(data.totalAmount);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // INCOME BUTTON
  const handleDataIncome = (e) => {
    if (title === '') {
      alert('Enter a title')
    } else if (isNaN(amount) || amount === '') {
      alert('Enter a valid value')
    } else if (date === '') {
      alert('Enter Date')
    }
    else {
      const category = 'income';
      setinfo([...info, { title: title, amount: amount, date: date, category: category }]);
      const userID = localStorage.getItem('UserID');
      const newTransaction = { user: userID, title: title, amount: amount, date: date, category: category };

      console.log("Income button clicked");
      settitle('');
      setamount('');
      setDate('');
      e.preventDefault();

      // FOR STORING INCOME DATA TO DATABASE
      fetch(`https://pitaka-react-project-backend.onrender.com/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      })
        .then(response => response.text())
        .then(result => {
          console.log(result);
          window.location.reload(true); // Reload page after successful POST
        })
        .catch(error => console.log(error));

    }
    
  }


  //EXPENSES BUTTON
  function handleDataExpenses(e) {

    if (title === '') {
      alert('Enter a title')
    } else if (isNaN(amount) || amount === '') {
      alert('Enter a valid value')
    } else if (date === '') {
      alert('Enter Date')
    }
    else {
      const category = 'expenses';
      setinfo([...info, { title: title, amount: amount, date: date, category: category }]);
      const userID = localStorage.getItem('UserID');
      const newTransaction = { user: userID, title: title, amount: amount, date: date, category: category };

      settitle('');
      setamount('');
      setDate('');
      e.preventDefault();

      // FOR STORING Expenses DATA TO DATABASE
      fetch('https://pitaka-react-project-backend.onrender.com/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      })
        .then(response => response.text())
        .then(result => {
          console.log(result);
          window.location.reload(true); // Reload page after successful POST
        })
        .catch(error => console.log(error));

    }

   
  }
  return (
    <Context.Provider value={{ title, settitle, amount, setamount, date, setDate, info, handleDataIncome, handleDataExpenses, remaining, setRemaining, income, setIncome, expenses, setExpenses }}>{children}
    </Context.Provider>
  );
}

export default ContextProvider;