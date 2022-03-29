var express = require('express');
const path = require('path');
var app = express();
const port = 3000


const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');

async function loadModel(){
    const handler = tfnode.io.fileSystem('playground/model.json');
    const model = await tf.loadLayersModel(handler);
    console.log(model);
    console.log("Model loaded")
}


app.use('/', function (req, res) {
    loadModel();
    res.sendFile(__dirname + '/sample.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})