var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cachedMsg = '';


app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('note_change', function(msg){
    socket.broadcast.emit('note_change', msg);
    cachedMsg = msg;

  });
  socket.emit('note_change', cachedMsg);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
