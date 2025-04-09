import express from "express"
import { protectroute } from "../middleware/protectroute.middleware.js"
import { getmessages, getUsersForSidebar,sendmessage } from "../controller/message.controller.js"
const router = express.Router()
router.get("/users", getUsersForSidebar)
    .get("/:id", protectroute, getmessages)
    .post("/send/:id", protectroute, sendmessage)
export default router;
