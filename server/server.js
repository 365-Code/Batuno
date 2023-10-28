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


app.use(cors({origin: "https://batuno.vercel.app"}));
app.use(express.json())


app.use('/api/auth', authRoute)
app.use('/api/message', messageRoute)
app.get('/', (req, res)=>{
    res.send("Server is listening")
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is Listening at https://batuno-server.vercel.app:${process.env.PORT}`.bgCyan.white);
})

const io = new Server(server, {
    cors: {
        origin: "https://batuno.vercel.app",
        methods: ["GET", "POST"],
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