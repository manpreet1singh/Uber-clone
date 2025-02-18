const userModel=require('../models/user.models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

module.exports.authUser=async(req,res,next)=>{
const token=req.cookies.token||req.headers.authorization.split(' ')[1]//split by ' 'and get at index[1]
if(!token){
    return res.status(401).json({message:'Unauthorized'})
}
try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user=await userModel.findById(decoded._id)
    // console.log(user)
    if(!user){
        return res.status(401).json({message:'Unauthorized'})
    }
    req.user=user//here we set the user to the request object
    return next() 
}
catch(err){
    return res.status(401).json({message:'Unauthorized'})

}
}