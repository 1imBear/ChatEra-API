import { Server } from "socket.io";
import MessageRepository from "../repo/MessageRepository";
import messageViewModel from "../viewmodels/MessageViewModel";

const socket = (sslServer) => {
    const io = new Server(sslServer);
    var messages = [];
    try {
        io.on('connection', function (socket) {
            socket.on('subscribe', function(data) {
                const room_data = JSON.parse(data)
                var userName = room_data.PublicKey;
                const roomName = room_data.ChatId;
    
                socket.join(`${roomName}`)
                io.to(`${roomName}`).emit('newUserToChatRoom',userName);
            })
    
            socket.on('unsubscribe',function(data) {
                const room_data = JSON.parse(data)
                const userName = room_data.PublicKey;
                const roomName = room_data.ChatId;
    
                socket.broadcast.to(`${roomName}`).emit('userLeftChatRoom',userName)
                socket.leave(`${roomName}`)
            })
    
            socket.on('newMessage',function(data) {
                const messageData = JSON.parse(data);
                const userName = messageData.PublicKey;
                const messageContent = messageData.Content
                const roomName = messageData.ChatId
                
                const chatData = messageViewModel
                chatData.ChatId = roomName
                chatData.PublicKey = userName
                chatData.Content = messageContent

                messages.push(chatData);
    
                socket.broadcast.to(`${roomName}`).emit('updateChat',JSON.stringify(chatData)) // Need to be parsed into Kotlin object in Kotlin
            })
    
            //user typing function
    
            // socket.on('typing',function(roomNumber){ //Only roomNumber is needed here
            //     console.log('typing triggered')
            //     socket.broadcast.to(`${roomNumber}`).emit('typing')
            // })
    
            // socket.on('stopTyping',function(roomNumber){ //Only roomNumber is needed here
            //     console.log('stopTyping triggered')
            //     socket.broadcast.to(`${roomNumber}`).emit('stopTyping')
            // })
    
            socket.on('disconnect', function () {
                MessageRepository.CreateMany(messages);
                messages = [];
            });
        })
    } catch (error) {
        console.log(error);
    }
}


export default socket