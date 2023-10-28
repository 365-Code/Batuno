import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    secPin:{
        type: Number,
        required: true,
        length: 6
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: "/assets/defaultAvatar.jpg"
    }
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema)

export default userModel