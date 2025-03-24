import jwt from "jsonwebtoken"
import User from "../model/user.model.js"
export const protectroute= async (req,res,next)=>{
    const token=req.cookies.token
    if(!token){
    return res.status(401).json({message:"UnAuthorized"})
    }
    const key=jwt.verify(token,process.env.secretkey)
    if(!key){
        return res.status(401).json({message:"UnAuthorized"})
    }
    const user=await User.findById(key.userId).select("-password")
    req.user=user
    next()
}
