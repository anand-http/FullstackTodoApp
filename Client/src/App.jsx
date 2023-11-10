import React, { useContext, useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Header from './component/Header';
import Register from './component/Register';
import MyProfile from './component/MyProfile';
import Task from './component/Task';
import { Context } from './ContextApi';
import { Navigate } from 'react-router-dom';
import { server } from './main';
import axios from 'axios';


const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [user, setUser] = useState({});


  useEffect(() => {


    axios.get(`${server}/users/myprofile`, {
      withCredentials: true
    })
      .then((res) => setUser(res.data.user), setIsAuthenticated(true), setTimeout(() => {
        setIsAuthenticated(false);
      }, 15 * 60 * 1000))
      .catch((error) => console.log("error while fetching my profile ==> ", error.response.data.message));


  }, []);

  return (
    <Router>
      <Header />
      <Routes>

        <Route path='/' element={isAuthenticated ? <Task /> : <Register />} />
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to='/' />} />
        <Route path='/myprofile' element={isAuthenticated ? <MyProfile user={user} /> : (<Navigate to="/" />)} />

      </Routes>
    </Router>
  )
}

export default App;