import express from "express"
import { signup, signout, login ,updateprofile,checkauth} from "../controller/auth.controller.js"
import {protectroute} from "../middleware/protectroute.middleware.js"
const router = express.Router()
router
    .post("/signup", signup)
    .post("/signout", signout)
    .post("/login", login)
    .post("/update-profile", protectroute, updateprofile)
    .get("/checkauth", protectroute, checkauth)




export default router;