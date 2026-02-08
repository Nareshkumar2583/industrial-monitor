const Sensor=require('../models/Sensor')
exports.addData=async(req,res)=>{
    const{device,temperature,voltage}=req.body;
    let alert="normal";
    if(temperature>50 || voltage>220){
        alert="Warning !"
    }
    const data=new Sensor({
        device,temperature,voltage,alert})
    await data.save()
    res.json({message:"Data added successfully",alert})
}
exports.getData=async(req,res)=>{
    const data=await Sensor.find().sort({time:-1});
    res.json(data)
}