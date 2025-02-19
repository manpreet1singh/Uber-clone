const mongoose  = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema=new mongoose.Schema({
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
        },
        status:{
            type:String,
            enum:['active','inactive'],
            default:'inactive'
        },
        vehicle:{
            color:{
                type:String,
                required:true

            },
            plate:{
                type:String,
                required:true,
            },
            capacity:{
                type:Number,
                required:true,
                min:[1,'capacity must be at least 1']
            },
            vehicleType:{
                type:String,
                enum:['car','motorcycle','auto'],
                required:true
            },
            location:{
                lat:{
                    type:Number,
                   
                },
                lng:{
                    type:Number,
                }
            }

        }
    
})

captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1h'})
    return token
}
captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}
const captainModel=mongoose.model('captain',captainSchema)

module.exports=captainModel