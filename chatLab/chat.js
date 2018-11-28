const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000, ()=>console.log('listing 9000 port'));
const io = socketio(expressServer);

io.on('connection', (socket)=>{
     socket.emit('messageFromServer', 'Welcome to the socketio server');
     socket.on('dataToServer', (dataFromClient)=>{
         console.log(dataFromClient);
     })
     socket.on('newMessageToServer', (message)=>{
         //console.log(message);
         io.emit('messageToClients', {text: message.text});
     })
 })

 io.of('/admin').on('connection', (socket)=>{
     console.log('Connected to the admin namespace');
     io.of('/admin').emit('welcome','Welcome to the admin namespace');
 })