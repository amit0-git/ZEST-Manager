const express=require ('express')
const mongoose=require('mongoose')
const cors = require('cors');


require('dotenv').config()

//user routes 
const userRoutes= require("./routes/userRoutes")
app=express()

//database connevtion 
mongoose.connect("mongodb://127.0.0.1:27017/zest")


//port 
const PORT=process.env.PORT || 5000
//middleware

app.get("/",(req,res)=>{
    res.send("Node Server")
})



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))   


//routes
app.use('/users', userRoutes);








app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})