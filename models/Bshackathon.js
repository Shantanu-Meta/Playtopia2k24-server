const mongoose = require('mongoose')
const { Schema } = mongoose;

const bshackathon = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        require:true
    },
    email:{
        type:String, 
        require: true,
        unique:true
    }, 
    phoneNo:{
        type:Number, 
        require:true
    },
    department:{
        type:String, 
        require:true
    },
    startupName:{
        type:String, 
        require:true
    }, 
    startUpCategory:{
        type:String, 
        require:true
    }, 
    event: {
        type: String, 
        require: true
    }
}, {timestamps:true})
let bshackathonRegisters = mongoose.model('bshackathon', bshackathon); 
module.exports = bshackathonRegisters