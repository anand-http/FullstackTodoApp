import axios from 'axios';
import React, { useContext } from 'react';
import { server } from '../main';
import { Context } from '../ContextApi';

const GetTask = ({ title, des, id }) => {
    const {  setRefresh } = useContext(Context);

    const handleUpdate = async () => {
        try {
            const { data } = await axios.put(`${server}/tasks/updatetask/${id}`, {}, {
                withCredentials: true
            });
            console.log(data.message);
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${server}/tasks/deletetask/${id}`, {
                withCredentials: true
            })
            console.log(data.message);
            setRefresh((prev) => !prev)

        } catch (err) {
            console.log(err);
            alert(err.message);
        }

    }
    return (
        <div className='getTask'>

            <div className="getTask-left" >

                <h2> {title} </h2>
                <br />
                <h4>{des}</h4>

            </div>

            <div className="getTask-right">
                <input onChange={handleUpdate} type='checkbox' />
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>

    )
}

export default GetTask;