var express = require('express');
const path = require('path');
var app = express();
const port = 3000

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + "/public"))


app.use('/', function (req, res) {
    // var model = loadModel();
    res.render(__dirname + '/public/sample.html', {sample: "Text"});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

