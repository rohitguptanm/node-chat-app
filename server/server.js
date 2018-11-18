const path = require('path');
const http = require('http');
const express = require("express");
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMsg',{
        from:'Admin',
        text:'Welcom to the chat app',
        createdAt: new Date().getTime()
      });

      socket.broadcast.emit('newMsg',{
        from:'Admin',
        text:'New User joined',
        createdAt: new Date().getTime()
      });


    socket.on('createMsg', (msg) => {
        console.log('createMsg', msg);
        io.emit('newMsg',{    // it emit everyone
            from:msg.from,
            text:msg.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMsg',{    // it emit everyone except sender
        //     from:msg.from,
        //     text:msg.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});