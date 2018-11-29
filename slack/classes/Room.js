class Room{
    constructor(roomId, roomTitle, namespace, priavteRoom=false){
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespace = namespace;
        this.priavteRoom = priavteRoom;
        this.history = [ ]
    }

    addMessage(message){
        this.history.push(message);
    }

    clearHistory(){
        this.history = [];
    }
}

module.exports = Room;