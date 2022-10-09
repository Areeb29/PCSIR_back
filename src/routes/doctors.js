const express = require('express');
const route = express.Router();
const bcrypt = require('bcryptjs');
const Doctor = require('../models/doctors');

route.post('/signup',
    async (req, res) => {

        try {
            //The doctor already exists
            let doctor = await Doctor.findOne({ email: req.body.email });
            if (doctor) {
                return res.status(400).json({ message: 'Sorry, a Doctor with this email already exists.' });
            }

            //create salt and hash for secure password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //create a new Doctor
            doctor = await Doctor.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: secPass,
                designation: req.body.designation
            })

            res.json({ message: "success" });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }

    })

route.get('/all', async (req, res)=>{
    let doctors = await Doctor.findOne({ email: "doctorB@gmail.com" });;
    console.log(doctors)
    res.json(doctors)
})
route.post('/login',
    async (req, res) => {
        try {
            //find a Doctor with the email
            let doctor = await Doctor.findOne({ email: req.body.email });
            console.log(doctor)
            console.log(req.body)
            if (!doctor) {
                return res.status(400).json({ message: 'Please Signup first' })
            }

            const passwordCompare = await bcrypt.compare(req.body.password, doctor.password)
            if (!passwordCompare) {
                res.status(400).json({ type: "error", message: 'Please enter valid credentials' })
            }
            console.log(passwordCompare);

            res.status(200).json({ type: "success", message: doctor.designation });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
)
module.exports = route;