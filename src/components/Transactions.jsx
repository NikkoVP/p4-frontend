import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faSort } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';
import Context from '../Context';

function Transactions(props) {

  const data = useContext(Context);
  const [sortOrder, setSortOrder] = useState('asc');
  const styles = {
    income: {
      color: 'green',
      fontWeight: 'bold'
    },
    expenses: {
      color: 'red',
      fontWeight: 'bold'
    }
  };
  const options = { maximumFractionDigits: 2 }
  const [transaction, setTransaction] = useState([]);

  // Filtered all Transaction by user
  const userID = localStorage.getItem('UserID');
  let displayTransactions = [];
  displayTransactions = transaction.filter((obj) => {
    if (obj.user === userID) {
      return obj;
    }
  })

  // GET all data
  const fetchData = async () => {
    ;
    const response = await fetch(`http://127.0.0.1:3000/transactions`)
    const { data } = await response.json();

    setTransaction(data);
  };
  useEffect(() => {
    fetchData();
  }, []);



  const handleDelete = (id) => () => {
    fetch(`http://127.0.0.1:3000/transactions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

    window.location.reload(true);
  };

  //Sort Table
  const sortDataByDate = () => {

    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    // const sortedData = [...storedData];
    transaction.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  }

  const sortDataByAmount = () => {

    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    // const sortedData = [...storedData];
    transaction.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
  }

  return (
    <div className='transaction-Container'  >

      <Table >
        <thead className='tableHeader'>
          <tr>
            <th>Title</th>
            <th>Amount <a className='sort' onClick={sortDataByAmount}><FontAwesomeIcon icon={faSort} /></a></th>
            <th>Date <a className='sort' onClick={sortDataByDate}><FontAwesomeIcon icon={faSort} /></a></th>
            <th style={{ display: props.actionDisplay }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayTransactions.slice(props.value).map((data, index) => {
            return (
              <tr key={index} >
                <td>{data.title}</td>
                <td style={data.category === 'income' ? styles.income : styles.expenses}>{Intl.NumberFormat("en-US", options).format(data.amount)}</td>
                <td>{data.date}</td>
                <td className='actions' style={{ display: props.actionDisplay }}><a onClick={handleDelete(data._id)}><FontAwesomeIcon icon={faTrashCan} /></a></td>
              </tr>
            )
          })}
        </tbody>
      </Table>


    </div>
  );
}

export default Transactions;