import mongoose from "mongoose";
import 'colors'



const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log("Database Connected".bgMagenta.white)
    } catch(error){
        console.log(`${error}`.bgRed.white)
    }
}



export default connectDB