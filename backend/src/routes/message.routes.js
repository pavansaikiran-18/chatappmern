import express from "express"
import { protectroute } from "../middleware/protectroute.middleware.js"
import { getmessages, getUsersForSidebar,sendMessage } from "../controller/message.controller.js"
const router = express.Router()
router.get("/users", getUsersForSidebar)
    .get("/:id", protectroute, getmessages)
    .post("/send/:id", protectroute, sendMessage)
export default router;
