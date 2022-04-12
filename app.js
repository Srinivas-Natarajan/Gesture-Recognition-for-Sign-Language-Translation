var express = require('express');
const path = require('path');
var app = express();
const port = 3000

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + "/public"))

const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');

// async function loadModel(){
//     const handler = tfnode.io.fileSystem('model_saves/tensorflowjs_model/model.json');
//     const model = await tf.loadLayersModel(handler);
//     // console.log(model);
//     console.log("Model loaded");
//     return model;
// }


app.use('/', function (req, res) {
    // var model = loadModel();
    res.render(__dirname + '/public/sample.html', {sample: "Text"});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

