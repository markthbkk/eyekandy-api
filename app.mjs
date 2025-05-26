import express from "express";
import  cors from "cors";
import imageRouter from "./routes/imageRoutes.mjs";


const app = express()

app.use(express.json());
app.use(cors());
app.use("/", imageRouter);



export default app;