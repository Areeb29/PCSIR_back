const express = require('express');
const route = express.Router();
const path = require('path');
const fs = require('fs');
const fsExtra=require('fs-extra');
//joining path of directory 
const directoryPath = path.join(__dirname, '..\\files\\');
const ReviewedPath = path.join(__dirname, '..\\files\\Reviewed');
//passsing directoryPath and callback function

route.post('/moveImage', async (req, res) => {
    try {
        // const newpath = "..\\backend\\files\\";
        const filename = req.body.currFile;
        const file = `${directoryPath}${req.body.oldFolder}\\${filename}`;
        fsExtra.move(file, `${directoryPath}${req.body.newFolder}\\${filename}`, function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ type: "error" });
            } 
            
                return res.status(200).json({ type: "success" });
           
           })
        
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

route.get('/getImages/:folder',async(req,res)=>{
    try{
        fs.readdir(`${directoryPath}\\${req.params["folder"]}`, function (err, files) {
            //handling error
            if (err) {
                return res.status(400).json({ type: "error" });
            } 
            else
            {
                return res.send(files);
            }
    
        });
    }
    catch(err){
        return res.status(400).json({ type: "error" });
    }
    
})
route.get('/getReviewedImages',async(req,res)=>{
    try{
        fs.readdir(ReviewedPath, function (err, files) {
            //handling error
            if (err) {
                return res.status(400).json({ type: "error" });
            } 
            else
            {
                return res.send(files);
            }
    
        });
    }
    catch(err){
        return res.status(400).json({ type: "error" });
    }
    
})

module.exports = route;