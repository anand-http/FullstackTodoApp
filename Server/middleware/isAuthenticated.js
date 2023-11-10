import jwt from "jsonwebtoken";
import 'dotenv/config.js';
import { User } from "../models/userModel.js";


const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({
            message: "Login first"
        })
    }

    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(tokenVerify._id);
    next();

}

export default isAuthenticated;