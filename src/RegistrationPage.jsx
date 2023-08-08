import { useState, useEffect } from "react";
import logo from './assets/PITAKA.png';

function Registration() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [userList, setUserList] = useState([]);

  // GET THE USERS
  const fetchData = async () => {
    const response = await fetch(`https://pitaka-react-project-backend.onrender.com/users`)
    const { data } = await response.json();
    setUserList(data)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const user = userList.filter((data) => {
    if (data.username === username) {
      return data;
    }
  })

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
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
    if (confirmPassword === '') {
      setErrorConfirmPassword(true);
    } else if (confirmPassword != '') {
      setErrorConfirmPassword(false);
    }
    if (password != '' && confirmPassword != '') {
      if (password != confirmPassword) {
        alert("password do not match!");
      }
    }
    if (name === '') {
      setErrorName(true);
    } else {
      setErrorName(false)
    }

    if (username != '' && password != '' && confirmPassword != '' && name != '') {
      const userData = {
        username,
        password,
        name
      }
      console.log(user)
      if (user.length === 0) {

        fetch('https://pitaka-react-project-backend.onrender.com/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            alert("Registration Successful!")
          })
          .catch((error) => {
            console.error(error);
          });
      }else{alert("username taken")}
    }
  };
  return (
    <div className="registrationpage">
      <div><img className="registrationImage" src={logo} alt="" /></div>
      <div>
        <form onSubmit={handleSubmit} className="registrationForm">
          <div><h1>Registration</h1></div>
          <div className="loginInputdiv">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="loginInput"
            />
            <div className="errorLabel"> {errorUsername && <label>Enter a Username!</label>}</div>
          </div>
          <div className="loginInputdiv">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
            />
          </div> <div className="errorLabel"> {errorPassword && <label>Enter a Password!</label>}</div>
          <div className="loginInputdiv">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"

              onChange={(e) => setConfirmPassword(e.target.value)}
              className="loginInput"
            />
          </div> <div className="errorLabel"> {errorConfirmPassword && <label>Confirm your Password!</label>}</div>
          <div className="loginInputdiv">
            <input
              type="text"
              id="Name"
              placeholder="Name"

              onChange={(e) => setName(e.target.value)}
              className="loginInput"
            />
          </div> <div className="errorLabel"> {errorName && <label>Enter your Name!</label>}</div>
          <div className="loginButtonDiv">
            <button type="submit" className="loginButton">Register</button>
          </div>
          <div className="loginLabelDiv"><label>Already have an Account? Click to <a href="/">Login</a></label></div>
        </form>
      </div>
    </div>
  );

}

export default Registration;