import app from "./app.mjs";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;



mongoose
  .connect(DB, {
    // useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT;



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
