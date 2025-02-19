const captainModel = require('../models/captain.models');
const {validationResult} = require('express-validator');
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.models');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array()); // Debugging
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body)
    const {fullname, email, password,vehicle} = req.body;
    const iscaptainAlreadyRegistered = await captainModel.findOne
    ({email});
    if (iscaptainAlreadyRegistered) {
        return res.status(400).json({message: 'Captain already registered'})
    }
    const hashedPassword = await captainModel.hashPassword(password);
    //console.log(hashedPassword)
    console.log(fullname.firstname)
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    }); 
    const token = captain.generateAuthToken();
    res.status(201).json({token, captain})
}

module.exports.loginCaptain=async(req,res,next)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){
    console.log("Validation Errors:", errors.array()); // Debugging
    return res.status(400).json({errors:errors.array()})
}
const {email,password}=req.body;
const captain=await captainModel.findOne({email}).select('+password')//to get passwrod for matching
if(!captain){
    return res.status(401).json({message:'Invalid email or password'})
}
const isMatch=await captain.comparePassword(password)
if(!isMatch){
    return res.status(401).json({message:'Invalid email or password'})
}
const token=captain.generateAuthToken();
res.cookie('token',token)
res.status(200).json({token,captain})
}

module.exports.getCaptainProfile=async(req,res,next)=>{
res.status(200).json(req.captain)//req.user is set in auth.middleware.js
}
module.exports.logoutCaptain=async(req,res,next)=>{

    const token=req.cookies.token||req.headers.authorization.split(' ')[1]
    await blacklistTokenModel.create({token })

    res.clearCookie('token')

    res.status(200).json({message:'Logged out successfully'})

}



