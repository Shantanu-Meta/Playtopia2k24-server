const mongoose = require('mongoose')
const { Schema } = mongoose;

const ballPool = new Schema({
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
    playerInGameName:{
        type:String, 
        require:true
    }, 
    playerInGameId:{
        type:String, 
        require:true
    }, 
    event:{
        type: String, 
        require: true
    }
}, {timestamps:true})
let ballPoolRegisters = mongoose.model('8ballpool', ballPool); 
module.exports = ballPoolRegisters