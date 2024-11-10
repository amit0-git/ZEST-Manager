const express=require ('express')
const mongoose=require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config()


//user routes 
const userRoutes= require("./routes/userRoutes")
const eventRoutes= require("./routes/eventRoutes")
app=express()

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // React app URL
    methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow credentials (cookies)
};

app.use(cors(corsOptions));

// Middleware to parse cookies
app.use(cookieParser());





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
app.use('/events', eventRoutes);







app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})