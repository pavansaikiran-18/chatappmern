import express from "express"
import { signup, logout, login ,updateProfile,checkAuth} from "../controller/auth.controller.js"
import {protectroute} from "../middleware/protectroute.middleware.js"
const router = express.Router()
router
    .post("/signup", signup)
    .post("/signout", logout)
    .post("/login", login)
    .post("/update-profile", protectroute, updateProfile)
    .get("/check", protectroute, checkAuth)




export default router;