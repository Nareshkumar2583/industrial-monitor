const mongoose=require('mongoose');
const sensorSchema=new mongoose.Schema({
    device:String,
    temperature:Number,
    voltage:Number,
    alert:String,
    time:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Sensor',sensorSchema);
