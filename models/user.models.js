const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minelength:[3,'first name must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            
            minlength:[3,'last name must be at least 3 characters long'],
        }},
        email:{
            type:String,
            required:true,
            unique:true,
            sparse:true,
            index:true
        },
        password:{
            required:true,
            type:String,
            select:false
          
        },
        socketId:{
            type:String
        }
        

    
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET)
    return token
}
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}

const userModel=mongoose.model('user',userSchema)

module.exports=userModel
