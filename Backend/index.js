import express from "express";
const app = express();
// import bodyParser from "body-parser";
// app.use(bodyParser.json());
import userRoutes from './Router/userRoute.js';
import cors from "cors";
import adminRoute from './Router/AdminRoute.js';
import './config/db.js';

app.use(express.json());
app.use(cors());
app.use("/admin", adminRoute);
app.use("/user", userRoutes);
app.listen(8080);
