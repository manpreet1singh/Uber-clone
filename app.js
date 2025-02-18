const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const express=require('express')
const cokkieParser=require('cookie-parser')
const app=express()
const connectionToDb=require('./db/db')
const userRoutes=require('./routes/user.routes')
connectionToDb()

app.use(cokkieParser())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.use('/users',userRoutes)
module.exports =app