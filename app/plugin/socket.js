import MessageRepository from "../repo/MessageRepository";

const sockets = (io) => {
    io.sockets.on('connection', function (socket) {
        socket.on('join', (data) => {
            try {
                const room_data = JSON.parse(data);
                socket.join(room_data.ChatId);
                var history = getMessages(room_data.ChatId)
                socket.emit('history',JSON.stringify(history));
            } catch (error) {
                console.log(error.message)
                socket.disconnect()
            }
        })          
    
        socket.on('leave', (data) => {
            try {
                const room_data = JSON.parse(data);
                socket.broadcast.to(room_data.ChatId).emit('leftChat',room_data.PublicKey)
                socket.leave(room_data.ChatId)
            } catch (error) {
                console.log(error.message)
                socket.disconnect()
            }
        })

        socket.on('readMessage', (data) => {
            try {
                const room_data = JSON.parse(data);;
                socket.broadcast.to(room_data.ChatId).emit('messageRead', true)
            } catch (error) {
                console.log(error.log)
                socket.disconnect()
            }
        })

        socket.on('sendMessage', (data) => {
            try {
                const room_data = saveMessage(data);
                socket.broadcast.to(room_data.ChatId).emit('updateChat',JSON.stringify(room_data));
            } catch (error) {
                console.log(error.message)
                socket.disconnect()
            }
        })

        socket.on('disconnect', (reason) => {
            if (reason === "io server disconnect") {
                socket.connect();
            }
        })
    })
}

var messages = []
const getMessages = (chatId) => {
    var data = messages.filter(keys => keys.ChatId == chatId)
    return data
}

const saveMessage = (data) => {
    try {
        var message = JSON.parse(data)
        
        messages.push(message);
        if(messages.length > 1){
            MessageRepository.CreateOne(message);
        }
        return data;
    } catch (error) {
        console.log(error.message)
        return null
    }
}

export default sockets