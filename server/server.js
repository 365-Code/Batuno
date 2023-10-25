import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import 'colors' 
import connectDB from './db.js';
import authRoute from './routes/userRoutes.js';
import messageRoute from './routes/messageRoute.js';
import {Server} from 'socket.io'


const app = express();
dotenv.config();

connectDB();


app.use(cors({origin: true}));
app.use(express.json())


app.use('/api/auth', authRoute)
app.use('/api/message', messageRoute)


const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is Listening at ${process.env.PORT}`.bgCyan.white);
})


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

global.onlineUsers = new Map()

io.on("connection", socket =>{

    socket.on("add-user", userId=>{
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-msg", (data)=>{
        const chatUser = onlineUsers.get(data.to);
        if(chatUser){
            socket.to(chatUser).emit("msg-received", data.message)
        }
    })
})