import express from "express"
import { protectroute } from "../middleware/protectroute.middleware.js"
import { getmessages, getuser } from "../controller/message.controller.js"
const router=express.Router()
router.get("/users",protectroute,getuser)
.get("/:id",protectroute,getmessages)
.post("/send/:id",protectroute,sendmessage)
