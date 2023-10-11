import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'


export const registerController = async (req, res)=>{
    try{

        const {username, email, secPin, password} = req.body
        const userCheck = await userModel.findOne({username});
        if(userCheck){
            return res.json({msg: "Username Already Used", status: false})
        }

        const emailCheck = await userModel.findOne({email});
        if(emailCheck){
            return res.json({msg: "Username Already Registered", status: false})
        }

        const secPassword = await bcrypt.hash(password, 10);
        
        const user = await userModel.create({
            username,
            email,
            secPin,
            password: secPassword
        });
        delete user.password;

        return res.json({user, status: true})
    } catch(error){
        console.log(error)
        return res.json({msg: "Internal Server Error"})
    }
}

export const loginController = async (req, res)=>{
    try{
        const {username, password} = req.body
        const user = await userModel.findOne({username});
        if(!user)
            return res.json({msg: "Incorrect username or password", status: false})
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword)
            return res.json({msg: "Incorrect username or password", status: false})
        
        user.password = ''
        return res.json({user, status: true})
    } catch(error){
        console.log(error)
        return res.json({msg: "Internal Server Error"})
    }
}

export const avatarController = async (req, res, next)=>{
    try{
        const {avatar} = req.body;

        const updUser = await userModel.findByIdAndUpdate(req.params.id, {
            $set: {avatarImage: avatar, isAvatarImageSet: true}
        });

        if(!updUser){
            return res.json({status: false, msg: 'User not Found'})
        }
        delete updUser.password

        const user = await userModel.findById(req.params.id).select("-password")

        return res.json({status: true, user})


    }catch(ex){
        next(ex)
    }
}

export const getAllUsersController = async (req, res)=>{
    try{
        const users = await userModel.find({_id: {$ne: req.params.id}}).select([
            "email","username","_id","avatarImage"
        ])

        return res.send(users);
    } catch(error){
        return res.json({msg: "Internal Server Error", error})
    }

}

export const forgetPasswordController = async(req, res, next)=>{
    try{

        const {username, secPin, password} = req.body;

        const user = await userModel.findOne({username});

        if(!user){
            return res.json({msg: "Invalid User Credentials", status: false});
        }
        
        const match = (user.secPin == secPin)
        
        if(!match){
            return res.json({msg: "Invalid User Credentials", status: false})
        }
        
        const secPass = await bcrypt.hash(password, 10)
        let id = user._id

        await userModel.findByIdAndUpdate(id, {$set:{password: secPass}});


        return res.json({msg: "Password updated Successfully", status: true})


    }catch(ex){
        next(ex)
    }
}