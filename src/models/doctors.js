const mongoose = require("mongoose");
const { Schema } = mongoose;

const DoctorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: 'A'
    }
});

module.exports = mongoose.model('doctors', DoctorSchema); 