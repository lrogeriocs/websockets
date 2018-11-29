    const socket = io('http://localhost:7654'); // the '/' namespace /endpoint
    

     //this handles the message that is emited by the server. Note te first param, it identifies the especific message
     socket.on('nsList', (nsData)=>{
         let namespacesDiv = document.querySelector('.namespaces');
         namespacesDiv.innerHTML = "";
         nsData.forEach((ns) => {
             namespacesDiv.innerHTML += `<div class= "namespace"><img src ="${ns.img}"/></div>`

            Array.from(document.getElementsByClassName('namespace')).forEach(elemn=>{
                elemn.addEventListener('click', (e)=>{
                    const nsEndpoint = elemn.getAttribute('ns');
                })
            })

            const nsSocket = io('http://localhost:7654/wiki');
            nsSocket.on('nsRoomLoad', (nsRooms)=>{
                //console.log(nsRooms);
                let rooms = document.querySelector('.room-list');
                rooms.innerHTML = "";
                nsRooms.forEach(room=>{
                    let glyph;
                    if(room.privateRoom){
                        glyph = 'lock'
                    }else{
                        glyph = 'globe'
                    }
                    rooms.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li> `
                })

                let roomNodes = document.getElementsByClassName('room'); //this is not a array
                Array.from(roomNodes).forEach((elemn)=>{
                   elemn.addEventListener('click', (e)=>{
                       console.log('someone has clicked on '+ e.target.innerHTMLText);
                   })    
                })
            })
         });

     })

     
    document.querySelector('#message-form').addEventListener('submit', (event)=>{
        event.preventDefault();
        const newMessage = document.querySelector('#user-message').value;
        socket.emit('newMessageToServer', {text: newMessage});
    })
    