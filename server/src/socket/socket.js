import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST']
    }
})

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on('connection', (socket) => {
    console.log('user joined', socket.id);
    const userId = socket.handshake.query.userId;
    if(userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })

    socket.on('clearMessage', ({conversationId}) => {
        const receiverSocketId = getReceiverSocketId(conversationId);
        if(receiverSocketId) 
            io.to(receiverSocketId).emit('clearMessage', {conversationId});
    })

    socket.on('seen', ({conversationId, userId}) => {
        const receiverSocketId = getReceiverSocketId(conversationId);
        if(receiverSocketId)
            io.to(receiverSocketId).emit('messageSeen', {userId: userId, conversationId: conversationId})
    })

    socket.on('updateSeen', ({conversationId}) => {
        const receiverSocketId = getReceiverSocketId(conversationId);
        if(receiverSocketId)
            io.to(receiverSocketId).emit('updated', {conversationId});
    })
})

export { io, server, app };
export default getReceiverSocketId;