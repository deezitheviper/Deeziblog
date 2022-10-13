import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRouter from './routes/Post.js';
import userRouter from './routes/User.js';
import authRouter from './routes/Auth.js';



const app = express();

dotenv.config()

app.use(express.json())

//Database
const connect = async  () => {
    const connection = await mongoose.connect(process.env.MONGODB)
    .catch(
        err => {
            console.log(err)
        }
    )
    console.log(`DB connected on database named ${connection.connection.name}`)
}


mongoose.connection.on('connected', () => {
    console.log("Connected")
  }); 

mongoose.connection.on('disconnected', () => {
    console.log("Disconnected")
  });


//Routes
app.get('/', (req, res)=>{
    res.send("Hello")
})
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)


app.listen(5000,() => {
    connect()
    console.log("Connected!")
})