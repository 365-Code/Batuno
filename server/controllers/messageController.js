import messageModel from '../models/messageModel.js'



export const sendMessage = async (req, res, next)=>{

    try{
        const {message, from, to} = req.body;

        await messageModel.create({
            message: {text: message},
            users: [from, to],
            sender: from
        })

        return res.status(200).json({msg: 'message sent successfully'})


    }catch(error){
        next(error)
    }

}

export const getMessages = async (req, res, next)=>{
    try{
        const {from, to} = req.body;

        const msgs = await messageModel.find({
            users:{
                $all: [from, to]
            }
        })

        const projectMessages = msgs?.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                msg: msg.message.text
            }
        })


        return res.json(projectMessages)


    } catch (ex){
        next(ex)
    }
}