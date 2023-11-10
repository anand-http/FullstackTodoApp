import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import 'dotenv/config.js';
import cookieToken from "../utils.js/cookiesToken.js";
import ErrorHandler from "../middleware/error.js";


export const Home = (req, res) => {
    res.send("Everything good");
}

export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //Check the validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please provide all fields" });
        }

        //Check if the user is already exist or not
        const existUser = await User.findOne({ email });

        if (existUser) {
            return next(new ErrorHandler("User already Exist", 400));
        }

        const hashPassword = await bcrypt.hash(password, 10);


        //Create the user
        const user = await User.create({ name, email, password: hashPassword });


        cookieToken(res, "Registered Successfully", 201, user,);

    }
    catch (error) {
        next(error);
    }
}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //basic validation
        if (!email, !password) {
            return res.status(400).json({
                error: "Please provide all fields"
            });
        }

        //check if the user exist and password is correct
        const user = await User.findOne({ email });

        //Compare the saved password with current password
        const compPassword = user ? await bcrypt.compare(password, user.password) : false;

        if (!user || !compPassword) {
            next(new ErrorHandler("Invalid Credential", 401))
        }

        cookieToken(res, `Welcome back ${user.name}`, 200, user);

    } catch (error) {
        next(error);
    }
}

export const MyProfile = async (req, res, next) => {
    const user = req.user;
    try {
        res.status(200).json({
            message: "My Profile",
            user
        })
    } catch (error) {
        next(error);
    }


}


export const Logout = async (req, res, next) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            Credential: true,
            sameSite: "none",
            secure: true
        }).json({
            message: "Logged Out"
        })
    }
    catch (err) {
        next(err);
    }
}