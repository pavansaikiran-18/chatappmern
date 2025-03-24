import User from "../model/user.model.js"
import bcrypt from "bcrypt"
import tokengen from "../view/utiles.js"
import v2 from "../view/cloudnary.js"
export const signup = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        if (email && password && fullName) {

            if (password.length < 6) {
                return res.status(400).json({ message: "Enter a valid length password" });
            }

            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(password, salt);

            const newuser = new User({
                fullName: fullName,
                email: email,
                password: hashpass,
            });

            await newuser.save(); // ✅ Save before token generation
            tokengen(newuser._id, res);

            return res.status(201).json({
                id: newuser._id,
                fullName: newuser.fullName,
                email: newuser.email,
                password: newuser.password, // ✅ Corrected
            });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message }); // ✅ Send error message
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "invalid Credential" })

            }
            const ispassword = await bcrypt.compare(password, user.password)
            if (!ispassword) {
                res.status(401).json({ message: "invalid Credential" })
            }
            tokengen(user._id, res)
            return res.status(201).json({
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                password: user.password, // ✅ Corrected
            });



        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error" })
    }

}
export const signout = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 })
        res.status(200).json({
            message: "Logout Succesfully"
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }

}
export const updateprofile = async (req, res) => {
    try {
        const { profilePic } = req.body
        const user = req.user._id
        if (!user) {
            return res.status(400).json({ message: "profile picture required" })
        }
        const uploadedres = await v2.UploadStream.upload(profilePic)
        const updateduser = User.findByIdAndUpdate(userId, { profilePic: uploadedres.secure_url }, { new: true })
        res.status(200).json(updateduser)
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }

}
export const checkauth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }

}