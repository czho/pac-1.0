const ScriptServer = require('scriptserver');
const sha1 = require('sha1');
const token = require('./tokens')
const config = require('./config');
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || config.port || 3000;
const seed = 100;
//let i = setInterval(()=>console.log(tokens.gen(seed)),10000)

const tokens = new token();

const server = new ScriptServer(config.server);

console.log(tokens.gen(seed))
io.on('connection', function (socket) {
  socket.key = tokens.gen(seed)
  socket.on('command', function ([msg, key]) {
    if (tokens.check(key, seed) === true) {
      server.sendConsole(msg);
      console.log('msg')
    } else {
      console.log('error key in invalid')
      log('new login error from ' + socket + ' with ' + key + ' as a token')
      socket.disconnect();
    }
  });
});

server.start();
io.emit('line', "starting server");
server.use(require('scriptserver-event'))
app.get('/:id', function (req, res) {
  let i = req.params.id;
  if (tokens.check(i, seed) === true) {
    res.sendFile(process.cwd() + '/public/' + 'javathingsarecool.html');
    //io.emit('line', 'new login from ' + req.ip);
    log('new login from ' + req.ip);
  } else {
    res.send('invalid token id');
    log('new login attempt from ' + req.ip + ' with ' + i + ' as a token')
  }
  console.log(tokens.gen(seed))

});



http.listen(port, function () {
  console.log('listening on *:' + port);
});

server.on('stop', line => {
  setTimeout(function () {
    process.exit(-1);
  }, 10000);
  //setTimeout(process.exit(-1), 10000);
});
server.on('console', line => {
  io.emit('line', line);
});

function log(i) {
  console.log(i)
  io.emit('line', i)
}