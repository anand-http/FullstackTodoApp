import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { server } from '../main';
import GetTask from './getTask';
import { Context } from '../ContextApi';

const Task = () => {
  const { refresh, setRefresh, loading, setLoading } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);

  useEffect(() => {
    axios.get(`${server}/tasks/gettasks`, {
      withCredentials: true
    }).then((res) => setTask(res.data.myTasks)).catch((err) => console.log("error while fetching task", err))

  }, [refresh])


  const handleTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/tasks/addtask`, {
        title, description
      }, {
        withCredentials: true
      });

      console.log(data.message);
      setRefresh((prev) => !prev);
      setTitle("");
      setDescription("");
      setLoading(false);

    } catch (error) {
      console.log("error aa gya hai ", error);
      alert(error.response.data.message);
      setLoading(false);
    }
  }
  return (
    <div className="tasks">
      <form onSubmit={handleTask} >
        <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <button disabled={loading} style={{ width: 'auto' }} type='submit'>Add Task</button>
      </form>

      {
        task.map((item, i) => {
          return (
            <GetTask key={i} title={item.title} des={item.description} id={item._id} />

          )
        })
      }

    </div>





  )
}

export default Task;