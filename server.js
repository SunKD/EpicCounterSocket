const express = require('express');
const app = express();
const path = require('path');

var bodyParser = require('body-parser');
app.unsubscribe(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + "./static")));
app.set('views', path.join(__dirname + "/views"));

app.set('view engine', 'ejs');

const server = app.listen(8000);
const io = require('socket.io')(server);
var counter = 0;

io.on('connection', function (socket) { //2
    socket.on('count', function(data){
        counter++;
        socket.emit('broad', counter);
    })

    socket.on('reset', function(data){
        counter = 0;
        socket.emit('resetted', counter );
    })
});

app.get('/', function (req, res) {
    res.render('index');
});



