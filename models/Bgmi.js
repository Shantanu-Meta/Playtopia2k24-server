const mongoose = require('mongoose')
const { Schema } = mongoose;

const Bgmi = new Schema({
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
    gameId:{
        type:String, 
        require:true
    }, 
    teamName:{
        type:String, 
        require:true
    }, 
    teamMate:{
        type:Object, 
        require: true
    },
    event: {
        type: String, 
        require: true
    }
}, {timestamps:true})
let bgmiRegisters = mongoose.model('bgmi', Bgmi); 
module.exports = bgmiRegisters