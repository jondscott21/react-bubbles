import React, { useState } from "react";
import axios from 'axios'

const initialState = {
  username: 'Lambda School',
  password: 'i<3Lambd4'
}

const Login = (props) => {
  const [login, setLogin] = useState(initialState)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', login)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.payload);
                props.history.push('/bubbles')
            })
            .catch(err => console.log(err))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
            <input type='text' name ='username' onChange={handleChange} value={login.username} placeholder='Name'></input>
            <input type='password' name ='password' onChange={handleChange} value={login.password} placeholder='Password'></input>
            <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
