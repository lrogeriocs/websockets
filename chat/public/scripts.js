    const socket = io('http://localhost:9000'); // the '/' namespace /endpoint
    const socket2 = io('http://localhost:9000/admin'); // the '/admin' namespace /endpoint

    //This is NOT mandatory, its just a exemple to show the socket id

    socket.on('connect', ()=>{
     console.log(socket.id);
    })

    
    socket2.on('connect', ()=>{
        console.log(socket2.id);
    })

     //this handles the message that is emited by the server. Note te first param, it identifies the especific message
     socket.on('messageFromServer', (dataFromServer)=>{
         console.log(dataFromServer);
         //this sends a message to the server , note the 'dataToServer arg. it identifies the message.
         socket.emit('dataToServer', {data: "Data from the client"});
     })

     socket2.on('welcome', (msg)=>{
         console.log(msg);
     })

    //Just for test

    // socket.on('ping', ()=> console.log('ping sent to the server'));
    // socket.on('pong', (latency)=>{
    //     console.log(latency);
    //     console.log('pong recieved from the server');
    // })
 
    document.querySelector('#message-form').addEventListener('submit', (event)=>{
        event.preventDefault();
        const newMessage = document.querySelector('#user-message').value;
        socket.emit('newMessageToServer', {text: newMessage});
    })
    
    socket.on('messageToClients', (message)=>{
        console.log(message);
        document.querySelector('#messages').innerHTML += `<li> ${message.text} </li>`;
    })
