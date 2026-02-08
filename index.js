require('dotenv').config();
const express=require('express');
const cors=require('cors')
const connectDB=require('./config/db');
const app=express();
connectDB()
app.use(cors())
app.use(express.json())
app.use('/api/sensor',require('./routes/sensorRoutes'))
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})