const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res)=>{
    res.end("I am conected");
})

const wws = new websocket.Server({server});

wws.on('headers',(headers, req)=>{
  console.log(headers);
})

wws.on('connection', (ws, req)=>{
  //sending message to the client
  ws.send('Welcome to the websocket server');
  //getting message from the client
  ws.on('message', (msg)=>{
      console.log(msg);
  })
})

server.listen(3000);