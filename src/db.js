const mongoose = require('mongoose');

const mongoURI = `${process.env.MONGODB_URI}`;

const mongodbConnect=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoose successfully");
    })
}

module.exports = mongodbConnect;