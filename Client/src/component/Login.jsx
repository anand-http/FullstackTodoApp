import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../main';
import { Context } from '../ContextApi';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setIsAuthenticated, isAuthenticated, loading, setLoading } = useContext(Context);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);


        try {

            const { data } = await axios.post(`${server}/users/login`, {
                email, password
            }, {
                withCredentials: true
            });

            console.log(data.message);
            setEmail('');
            setPassword("");
            setIsAuthenticated(true);

            setLoading(false);



        } catch (error) {
            console.log("Error while logging in ==> ", error.response.data.message);
            alert(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }

    }


    return (
        <div className='login'>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button disabled={loading} >Login</button>
            </form>
            <div className="or">
                <h3>OR</h3>
                <Link to="/" >Register</Link>
            </div>


        </div>
    )
}

export default Login;