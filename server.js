const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const multer = require('multer');

var upload = multer({ storage: storage })

const app = express()

app.use('*', cors())

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Pets Api." });
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

app.post('/api/v1pets/uploadpetpic', upload.single('picture'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database

    var finalImg = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_image, 'base64')
    };
    db.collection('quotes').insertOne(finalImg, (err, result) => {
        console.log(result)

        if (err) return console.log(err)

        console.log('saved to database')


    })
})

app.get('/pets/getpetpic', (req, res) => {
    db.collection('mycollection').find().toArray((err, result) => {

        const imgArray = result.map(element => element._id);
        console.log(imgArray);

        if (err) return console.log(err)
        res.send(imgArray)

    })
});


require("./app/routes/pet.routes.js")(app);
require("./app/routes/owner.routes.js")(app);
// set port, listen for requests
app.listen((process.env.PORT || 3000), () => {
    console.log("Server is running on port 3000.");
});