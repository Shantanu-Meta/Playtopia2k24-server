require('dotenv').config();
const mongoose = require('mongoose')
const mongodbURI = process.env.MONGODB_URI; 

const connectWithMongo = async () =>{
    await mongoose.connect(mongodbURI); 
    console.log("Connected with DB")
}

module.exports = connectWithMongo;

