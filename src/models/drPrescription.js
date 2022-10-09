const mongoose = require('mongoose');
const { Schema } = mongoose;

const PrescriptionSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    image_name:{
        type:String,
    },
    doctor:{
        type: String
    },
    prediction:{
        type: mongoose.Schema.Types.Mixed,
        default: false
    },
    suggestion:{
        type:String
    }
});

module.exports = mongoose.model('DrPrescription', PrescriptionSchema);