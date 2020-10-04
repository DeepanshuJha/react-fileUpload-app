const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

//Upload Endpoint
app.post('/uploads', (req, res) => {
    if(req.files === null){
        return res.status(400).json({ msg: 'No file was uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err){
            console.log(err);
            return res.status(500).send(err);            
        }

        //sending from server
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
});

app.listen(5000, () => console.log("Server started..."));