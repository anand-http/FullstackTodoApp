import jwt from "jsonwebtoken"
import 'dotenv/config';


const cookieToken = (res, message, statusCode, user) => {

    const token = jwt.sign({ _id: user.id, email: user.email }, process.env.SECRET_KEY);

    res.status(statusCode).cookie("token", token, {
        httOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "none",
        secure: true,
    }).json({
        message,

    })

}
export default cookieToken;