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
import axios from 'axios';
import { server } from './main.jsx';



const App = () => {
  const { setIsAuthenticated, isAuthenticated, setLoading } = useContext(Context);
  const [user, setUser] = useState({});
  const { email, setEmail, password, setPassword } = useContext(Context);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(data.message);
      setEmail('');
      setPassword('');

      // Set isAuthenticated to true
      setIsAuthenticated(true);

      // Store the authentication status in localStorage
      localStorage.setItem('isAuthenticated', 'true');

      setLoading(false);
    } catch (error) {
      console.log("Error while logging in ==> ", error.response.data.message);
      alert(error.response.data.message);

      // Set isAuthenticated to false
      setIsAuthenticated(false);

      // Remove the authentication status from localStorage
      localStorage.removeItem('isAuthenticated');

      setLoading(false);
    }
  };


  useEffect(() => {
    // Fetch user profile
    axios.get(`${server}/users/myprofile`, {
      withCredentials: true,
    })
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);

        // Set isAuthenticated to true when the user is logged in
        setIsAuthenticated(true);

        // Store the authentication status in localStorage
        localStorage.setItem('isAuthenticated', 'true');
      })
      .catch((error) => {
        console.log("Error while fetching my profile ==> ", error.response.data.message);

        // Set isAuthenticated to false when there is an error or the user is not logged in
        setIsAuthenticated(false);

        // Remove the authentication status from localStorage
        localStorage.removeItem('isAuthenticated');
      });
  }, []);




  return (
    <Router>
      <Header />
      <Routes>

        <Route path='/' element={isAuthenticated ? <Task /> : <Register />} />
        <Route path='/login' element={isAuthenticated ? <Task /> : <Login handleLogin={handleLogin} />} />
        <Route path='/myprofile' element={isAuthenticated ? <MyProfile user={user} /> : <Navigate to='/login' />} />

      </Routes>
    </Router>
  )
}

export default App;