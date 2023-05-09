const express = require("express");
const cors = require("cors");
const imageRouter = require("./routes/imageRoutes");


app = express()

app.use(express.json());
app.use(cors());
app.use("/", imageRouter);



module.exports = app;