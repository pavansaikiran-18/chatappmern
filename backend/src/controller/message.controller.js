import User from "../model/user.model.js";
import Message from "../model/message.model.js";
import { v2 as cloudinary } from "cloudinary";

// Get all users except the logged-in one
export const getUsersForSidebar = async (req, res) => {
    try {
      const loggedInUserId = "67ed2a632a8cd8c2b5748814";
      const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getUsersForSidebar: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

// Get messages between the logged-in user and another user
export const getmessages = async (req, res) => {
    try {
        const { user: reqUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: reqUserId },
                { senderId: reqUserId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getmessages: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Send a new message
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
    
        let imageUrl;
        if (image) {
          const uploadResponse = await cloudinary.uploader.upload(image);
          imageUrl = uploadResponse.secure_url;
        }
    
        const newMessage = new Message({
          senderId,
          receiverId,
          text,
          image: imageUrl,
        });
    
        await newMessage.save();
        res.status(201).json(newMessage);
      } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
};
