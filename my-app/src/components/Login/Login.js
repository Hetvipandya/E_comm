import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    
    const userId = users.find(user => user.email === email && user.password === password);
    
    if (userId) {
      sessionStorage.setItem('userId', userId._id);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <div className="back">
        <Header />
        <div className="div-center">
          <div className="content">
            <h3>Login</h3>
            <hr />
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit" className="btn btn-primary">Login</button>
              <hr />
              <button
                type="button"
                className="btn btn-link"
                onClick={() => navigate("/registration")}
              >
                Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

