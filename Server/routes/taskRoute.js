import express from 'express';
import { AddTask, GetTasks, UpdateTask, DeleteTask } from '../controller/tasksController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const route = express.Router();


route.post('/addtask', isAuthenticated, AddTask);
route.get('/gettasks', isAuthenticated, GetTasks);
route.put('/updatetask/:id', isAuthenticated, UpdateTask);
route.delete('/deletetask/:id', isAuthenticated, DeleteTask);

export default route;