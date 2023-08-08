import Header from './components/Header';
import { useState, useEffect } from 'react';

function Account() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [userList, setUserList] = useState([]);
  const userLocal = localStorage.getItem('UserID');


  const fetchData = async () => {
    const response = await fetch(`https://pitaka-react-project-backend.onrender.com/users`)
    const { data } = await response.json();
    setUserList(data)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const user = userList.filter((data) => {
    if (data._id === userLocal) {
      return data;
    }
  })

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (username === '') {
      setErrorUsername(true);
    } else {
      setErrorUsername(false);
    }
    if (password === '') {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    if (name === '') {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
    if (username != '' && password != '' && name != '') {
      const userData = {
        username,
        password,
        name
      }
      fetch(`https://pitaka-react-project-backend.onrender.com/updateUser/${user.map((data) => data._id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
      alert("User Updated!")
    }

    console.log('Updated Account:');
  };

  return (
    <div>
      <div><Header></Header></div>
      <div className="registrationpage">
        <form onSubmit={handleFormSubmit} className="registrationForm">
          <div><h1>Account Information</h1></div>
          <div className="loginInputdiv">
            <input
              type="text"
              id="username"
              placeholder={user.map((data) => data.username)}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="loginInput"
            />
            <div>  <label>Username</label></div>
          </div>
          <div className="loginInputdiv">
            <input
              type="text"
              id="password"
              placeholder={user.map((data) => data.password)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
            />
          </div> <div>  <label>Password</label></div>
          <div className="loginInputdiv">
            <input
              type="text"
              id="Name"
              placeholder={user.map((data) => data.name)}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="loginInput"
            />
          </div><div>  <label>Name</label></div>
          <div className="loginButtonDiv">
            <button type="submit" className="loginButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;