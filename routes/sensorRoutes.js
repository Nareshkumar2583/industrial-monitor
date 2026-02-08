const express=require('express')
const router=express.Router();
const{addData,getData}=require('../controllers/sensorController')
router.post('/add',addData)
router.get('/all',getData)
module.exports=router;