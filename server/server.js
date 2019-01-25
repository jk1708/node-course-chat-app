// const path = require('path');
// const http= require('http');
// const express = require('express');
// const socketIO= require('socket.io');
//
//
// const publicPath = path.join(__dirname, '../public');
// const port = process.env.PORT || 3000;
// var app = express();
// var server= http.Server(app);
// var io= socketIO(server);
// app.use(express.static(publicPath));
// io.on('connection',(socket)=>{
//   console.log('New User Connected');
//   socket.on('disconnect',()=>{
//     console.log('User was disconnected');
//   });
//
//   socket.on('createMessage', (message)=>{
//     console.log('createMessage', message);
//     io.emit('newMessage', {
//       from: message.from,
//       text: message.text,
//       createdAt: new Date().getTime()
//     });
//
//   });
// });
//
// server.listen(port, () => {
//   console.log(`Server is up on ${port}`);
// });
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage}= require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app') );

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is from server');

  });
socket.on('createLocationMessage',(locmessage)=>{
  io.emit('newLocationMessage',generateLocationMessage('Admin',`${locmessage.latitude}, ${locmessage.longitude}`));
});
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
