const mongoose = require('mongoose')
const { Schema } = mongoose;

const CentralSchema = new Schema({
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
        require: true
    }, 
    phoneNo:{
        type:Number, 
        require:true
    },
    teamName:{
        type:String, 
    },
    teamMate: {
        type:Object, 
    },
    event: {
        type: String, 
        require: true
    }
}, {timestamps:true})
let CentralRegisters = mongoose.model('central', CentralSchema); 
module.exports = CentralRegisters