const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

console.log(`Database: ${DB}`);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT;



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
