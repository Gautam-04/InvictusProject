import mongoose from "mongoose";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from 'node:http';

dotenv.config({
    path: './env'
})

const DB_NAME = "MERN-Stack-Boilerplate";


//db Connection
const connectDB = async() =>{
    try {
        const Connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDb connected at :- ${Connection.connection.host}`)
    } catch (error) {
        console.log(",MongoDb connection Error" , error);
        process.exit(1);
    }
}

connectDB();
//App setup
const app = express();
app.use(cors({ 
    origin: process.env.CORS_ORIGIN,
    credentials: true, 
}));
app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"));
app.use(cookieParser());

//Routes

//Socket connetion
const server = createServer(app);

const io = new Server(server,{
    pingTimeout: 60000,
    cors:{ 
        origin: '*',
        methods: ["GET", "POST"]
     },
});

app.set('io', io);

io.on('connection',(socket) => {
    console.log('Client connected', socket.id)

    socket.on('disconnect',()=>{
        console.log('Client disconnected')
    })
})

server.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server connected at port ${process.env.PORT}`)
})


