import express from "express";
import dotenv from "dotenv"
import authrouter from "./routes/auth.routes.js";
import messagerouter from "./routes/auth.routes.js";
import { connectdb } from "./view/db.js";
import cookieParser from "cookie-parser"
import cors from "cors"


const server = express()
dotenv.config()
server.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
server.use(express.json({ limit: '50mb' })); 

server.use(cookieParser())
server.use("/api/auth",authrouter)
server.use("/api/message",messagerouter)



server.listen(process.env.port, () => {
    console.log("server started")
    connectdb()
})
