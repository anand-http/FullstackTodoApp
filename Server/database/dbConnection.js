import mongoose from 'mongoose';
import 'dotenv/config.js';

const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Database connected Successfully");
    } catch (error) {
        console.log("Database not Connected", error);
    }

}

export default DbConnection;