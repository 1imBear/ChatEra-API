import "regenerator-runtime";
import MessageRepository from "../repo/MessageRepository";
import HashingHelper from "../helper/HashingHelper";

const sockets = (io) => {
    io.sockets.on('connection', function (socket) {
        socket.on('join', async (data) => {
            try {
                const room_data = JSON.parse(data);
                socket.join(room_data.ChatId);
                var history = await getMessages(room_data.ChatId)
                if(history.length > 0) {
                    socket.emit('history',JSON.stringify(history));
                }
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
                const room_data = JSON.parse(data);
                saveMessage(room_data);
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
const getMessages = async (chatId) => {
    var data = messages.filter(keys => keys.ChatId == chatId)
    if(data.length == 0){
        data = await MessageRepository.GetAllById(chatId)
    }
    return data
}

const saveMessage = async (data) => {
    try {        
        messages.push(data);

        await MessageRepository.CreateOne(data);
    } catch (error) {
        console.log(error.message)
        return null
    }
}

const saveKeys = (chatId) => {
    try {
        messages.push({
            ChatId: chatId,
            PrivateKey: HashingHelper.key16
        })
    } catch (error) {
        console.log(error.message)
    }
}

export default sockets