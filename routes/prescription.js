const express = require('express');
const route = express.Router();
const Prescription = require('../models/DrPrescription');

route.post('/addPrescription',
    async (req, res) => {

        try {
            const { image_name, doctor,prediction,suggestion } = req.body;
    

            let prescription = await Prescription.create({
                image_name: image_name,
                doctor: doctor,
                prediction: prediction,
                suggestion:suggestion
            })
            res.status(200).json({ type: "success", message: prescription });     
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }

    })


route.get('/getPrescription',
    async(req,res)=>{
       
        try{
            let pres = await Prescription.findOne({ image_name: req.query.image_name, doctor:req.query.doctor },{prediction:1,_id:0}).limit(1).sort({$natural:-1});
            
            res.send(pres)
        }
        catch(err){
            console.log(err)
            res.send("internal server error")
        }
    }    
)

route.get('/getSuggestion',
    async(req,res)=>{
       
        try{
            let drA = await Prescription.findOne({ image_name: req.query.image_name, doctor:"Doctor A"},{suggestion:1,_id:0}).limit(1).sort({$natural:-1});
            let drB = await Prescription.findOne({ image_name: req.query.image_name, doctor:"Doctor B"},{suggestion:1,_id:0}).limit(1).sort({$natural:-1});
            let drC = await Prescription.findOne({ image_name: req.query.image_name, doctor:"Doctor C"},{suggestion:1,_id:0}).limit(1).sort({$natural:-1});
            console.log(drA,drB,drC)
            if(drA || drB || drC)
            {
                res.status(200).json({ "Doctor A": (drA?.suggestion!==undefined?drA.suggestion:null),"Doctor B":(drB?.suggestion!==undefined?drB.suggestion:null),"Doctor C":(drC?.suggestion!==undefined?drC.suggestion:null) });
            }
            else
            {
                res.json({type:"Error"})
            }
         
        }
        catch(err){
            console.log(err)
            res.send("internal server error")
        }
    }    
)
module.exports = route;