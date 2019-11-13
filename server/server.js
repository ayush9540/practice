//required packages that we have installed
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//required port on which express server will run
const PORT = 3000;

//instance of express
const app = express();

//specify body parsor to handle json data
app.use(bodyParser.json());

//specify cors package
app.use(cors());

//code for get request
app.get('/', function(req, res) { //has access for req & res
    res.send('hello from the server');
});

app.listen(PORT, function() { //listen the request on specify port
    console.log("server running on localhost:" + PORT);
});

// basic express server file