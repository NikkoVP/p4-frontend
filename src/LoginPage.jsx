import { useState, useEffect } from "react";
import logo from './assets/PITAKA.png';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => {
    // Clean up local storage data when component unmounts
    return () => {
      localStorage.getItem('UserID') !== null ? localStorage.removeItem('UserID') : console.log("no userID");
      localStorage.getItem('token') != null ? localStorage.removeItem('token') : console.log("no token");
    };

  }, []);


  const handleSubmit = async (e) => {
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

    if (username != '' && password != '') {
      try {
        // Send login request to the server
        const response = await fetch('http://127.0.0.1:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          const { token } = data;
          localStorage.setItem('token', token);

          fetch('http://127.0.0.1:3000/protected', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              // Add any other custom headers here
            },
          })
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem('UserID', data);
              window.location.href = '/Homepage';

            })
            .catch((error) => {
              console.error(data.error);
            });
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error(error);
      }

    }
  };

  return (
    <div className="loginpage">
      <div><img className="loginImage" src={logo} alt="" /></div>
      <div>
        <form onSubmit={handleSubmit} className="loginForm">
          <div><h1>Login</h1></div>
          <div className="loginInputdiv">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="loginInput"
            />
            <div className="errorLabel"> {errorUsername && <label>Enter  Username!</label>}</div>
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
            <div className="errorLabel"> {errorPassword && <label>Enter  Password!</label>}</div>
          </div>
          <div className="loginButtonDiv">
            <button type="submit" className="loginButton">Login</button>
          </div>
          <div className="loginLabelDiv"><label>Not yet registered? Click Here to <a href="/RegistrationPage">SignUp</a></label></div>
        </form>
      </div>
    </div>
  );
}

export default Login;