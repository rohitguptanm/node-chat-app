var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createMsg',{
    //   from:'rock@emaple.com',
    //   text:'Hey working man'
    // });
});

 socket.on('disconnect', function() {
    console.log('disconnect from server');
});

socket.on('newMsg', function(msg) {
    console.log('newMsg', msg);
})