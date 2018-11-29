const express = require('express');
const app = express();
const socketio = require('socket.io');
let namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(7654, ()=>console.log('listing 7654 port'));
const io = socketio(expressServer);


io.on('connection', (socket)=>{
  let nsData = namespaces.map((ns)=>{
     return {
         img: ns.img,
         endpoint: ns.endpoint
     }
  })
  socket.emit('nsList', nsData);
})

namespaces.forEach((namespace)=>{
   io.of(namespace.endpoint).on('connection', (nsSocket)=>{
       console.log(`${nsSocket.id} has joined to ${namespace.endpoint}`);
       nsSocket.emit('nsRoomLoad', namespaces[0].rooms);
   })

})
 