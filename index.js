const express = require(`express`);
const app = express()
app.use(express.json());
const io = require("socket.io")(3005,{cors: {origin: "*",methods: ["GET", "POST"]}})

console.log('initialized');

io.on("connection", (socket) => {
    console.log("SocketIO is Runing -----------------------",Math.random()*10);

    socket.on('initializeUser',data=>{
        console.log('User Initialized');
        socket.join(data.myId)
        socket.on('user-send',msg=>{
            socket.broadcast.to(msg.getter).emit('user-receive', {sender: msg.sender, getter: msg.getter, text: msg.text, time: msg.time})
        })
    })

    socket.on('initializeGroup',data=>{
        console.log('Group Initialized');
        socket.join(data.groupId)
        socket.on('group-send',msg=>{
            socket.broadcast.to(data.groupId).emit('group-receive', {senderId: msg.senderId, senderUsername: msg.senderUsername, getter: msg.getter, text: msg.text, time: msg.time})
        })
    })

    socket.on('initializeChannel',data=>{
        console.log('Channel Initialized');
        socket.join(data.channelId)
        socket.on('channel-send',msg=>{
            socket.broadcast.to(data.channelId).emit('channel-receive', {senderId: msg.senderId, senderUsername: msg.senderUsername, getter: msg.getter, text: msg.text, time: msg.time})
        })
    })

});
