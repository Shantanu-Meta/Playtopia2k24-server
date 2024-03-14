const mongoose = require('mongoose')
const { Schema } = mongoose;

const openmic = new Schema({
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
    type:{  // open mic / stand up comedy
        type:String, 
        require:true
    }, 
    perform:{ // solo/ duo/ group
        type:String, 
        require:true
    }, 
    title:{  // open mic / stand up comedy
        type:String, 
        require:true
    }, 
    desc:{ // solo/ duo/ group
        type:String, 
        require:true
    }, 
    event: {
        type: String, 
        require: true
    }
}, {timestamps:true})
let openmicRegisters = mongoose.model('openmic', openmic); 
module.exports = openmicRegisters