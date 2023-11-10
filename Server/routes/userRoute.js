import express from 'express';
import { Logout, Register, MyProfile, Home, Login } from '../controller/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const route = express.Router();

route.get('/', Home);
route.post('/register', Register);
route.post('/login', Login);
route.get('/myprofile', isAuthenticated, MyProfile)
route.get('/logout', isAuthenticated, Logout)

export default route;