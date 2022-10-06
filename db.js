const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://pcsir:pcsir1980@clusterdr.fbyyijw.mongodb.net/?retryWrites=true&w=majority";

const mongodbConnect=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoose successfully");
    })
}

module.exports = mongodbConnect;