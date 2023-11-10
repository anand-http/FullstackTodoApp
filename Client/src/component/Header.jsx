import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../main'
import { Context } from '../ContextApi'

const Header = () => {
    const { setRefresh, setIsAuthenticated, isAuthenticated, loading, setLoading } = useContext(Context);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${server}/users/logout`, {
                withCredentials: true
            })
            console.log(data);
            alert(data.message);
            setRefresh((prev) => !prev)
            setIsAuthenticated(false);
            setLoading(false);


        } catch (err) {
            console.log(err)
            alert(err.response.data.error);
            setLoading(false);
        }

    }
    return (
        <div className='header'>
            <div className="logo">
                <h1>Todo</h1>
            </div>

            <div className="menu">
                <Link to={'/'}>Home</Link>
                <Link to={'/myprofile'}>MyProfile</Link>
                {
                    isAuthenticated ? (<button disabled={loading} onClick={handleLogout}>Logout</button>) : ""
                }
            </div>

        </div>
    )
}

export default Header