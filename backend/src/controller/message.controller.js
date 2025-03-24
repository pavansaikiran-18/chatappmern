import User from "../model/user.model.js"
import Message from "../model/message.model.js"
import v2 from "cloudinary"
export const getuser = async (req, res) => {
    try {
        const userid = req.user._id
        const alluser = await User.find({ _id: { $ne: userid } }).select("-password")
        res.status(200).json(alluser)
    }
    catch (error) {
        res.status(401).json({ message: "Unsuccessful" })
        res.status(500)

    };

}
export const getmessages = async (req, res) => {
    try {
        const { user: requser } = req.params

        const myid = req.user._id
        const messages = await Message.find({
            $or: [
                { senderId: myid, recieverId: requser },
                { senderId: requser, recieverId: myid }
            ],
        })
        res.status(200).json(messages)
    }

    catch (error) {
        console.log("error in get message controller")
        res.send(500).json({ message: "internal server error" })
    }
}
export const sendmessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: recieverId } = req.params
        const senderId = req.user._id
        let imageurl
        if (image) {
            const uploadres = await v2.uploader.upload(image)
            imageurl = uploadres.secure_url
        }
        newMessage = new Message({
            senderid,
            recieverid,
            text,
            image: imageurl
        })
        await newMessage.save()
        res.status(201).json(newMessage)

    } catch (error) {
        console.log("error in message controller:", error.mesage)
        res.status(500).json({ message: "Internal server error" })
    }

}
