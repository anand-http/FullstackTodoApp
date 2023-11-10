import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { server } from '../main';
import { Context } from '../ContextApi';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsAuthenticated, loading, setLoading } = useContext(Context);


    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${server}/users/register`, {
                name, email, password
            }, {
                withCredentials: true
            });
            alert(data.message);
            setName("");
            setEmail("");
            setPassword("");
            setIsAuthenticated(true);
            setLoading(false);

        } catch (error) {

            console.log(error);
            alert(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }

    return (
        <div className='register'>
            <form onSubmit={handleRegister} >
                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button disabled={loading} type='submit'>Register</button>

            </form>
            <div className="or">
                <h3>OR</h3>
                <Link to="/login" >Login</Link>
            </div>

        </div>
    )
}

export default Register;