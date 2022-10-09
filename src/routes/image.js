const express = require('express');
const route = express.Router();
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
//joining path of directory 
const directoryPath = path.join(__dirname, '..\\files\\');
const ReviewedPath = path.join(__dirname, '..\\files\\Reviewed');
//passsing directoryPath and callback function
const { listFiles, moveFile, getImage } = require('../driveUtils')
route.get('/:fileID', async (req, res) => {
    try {
        const file = await getImage(req.params.fileID, res);
        let buf = [];
        file.data.on('data', (e) => buf.push(e));
        file.data.on("end", () => {
            const buffer = Buffer.concat(buf);
            res.contentType('image/jpeg');
            res.send(buffer);
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

route.post('/moveImage', async (req, res) => {
    try {
        // const newpath = "..\\backend\\files\\";
        const fileID = req.body.currFile;
        // const file = `${directoryPath}${req.body.oldFolder}\\${filename}`;
        
        const status = await moveFile(fileID, req.body.newFolder)
        res.status(status).json({ type: "success" });

        // fsExtra.move(file, `${directoryPath}${req.body.newFolder}\\${filename}`, function (err) {
        //     if (err) {
        //         return res.status(400).json({ type: "error" });
        //     }

        //     return res.status(200).json({ type: "success" });

        // })

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

route.get('/getImages/:folder', async (req, res) => {
    try {
        // fs.readdir(`${directoryPath}\\${req.params["folder"]}`, function (err, files) {
        //     //handling error
        //     if (err) {
        //         return res.status(400).json({ type: "error" });
        //     }
        //     else {
        //         return res.send(files);
        //     }

        // });
        let files = await listFiles(req.params.folder)
        files = files.map(file=>file.id)
        res.send(files);
    }
    catch (err) {
        return res.status(400).json({ type: "error" });
    }

})

// route.get('/getReviewedImages',async(req,res)=>{
//     try{
//         fs.readdir(ReviewedPath, function (err, files) {
//             //handling error
//             if (err) {
//                 return res.status(400).json({ type: "error" });
//             } 
//             else
//             {
//                 console.log(files)
//                 return res.send(files);
//             }

//         });
//     }
//     catch(err){
//         return res.status(400).json({ type: "error" });
//     }

// })

module.exports = route;