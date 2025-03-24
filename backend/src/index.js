import express from "express";
import dotenv from "dotenv"
import authrouter from "./routes/auth.routes.js";
import messagerouter from "./routes/auth.routes.js";
import { connectdb } from "./view/db.js";
import cookieParser from "cookie-parser"


const server = express()
dotenv.config()
server.use(express.json())
server.use(cookieParser())
server.use("/api/auth",authrouter)
server.use("/api/mesage",messagerouter)



server.listen(process.env.port, () => {
    console.log("server started")
    connectdb()
})
