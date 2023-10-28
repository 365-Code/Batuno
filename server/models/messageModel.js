import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    message: {
        text:{
            type: String,
            required: true
        }
    },
    users : Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

const messageModel = mongoose.models.Message || mongoose.model('Message', messageSchema)


export default messageModel