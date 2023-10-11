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

export default mongoose.model('Message', messageSchema)
