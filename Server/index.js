import app from "./app.js";
import 'dotenv/config.js';
import DbConnection from "./database/dbConnection.js";

DbConnection();

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});