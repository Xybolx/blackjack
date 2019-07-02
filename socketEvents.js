module.exports = function (io) {
    const connections = {};
    const onlineUsers = [];
  
    io.sockets.on('connection', socket => {
      console.log('user connected on: ' + socket.id);
  
      socket.on('disconnect', () => {
        console.log('user disconnected from ' + socket.id);
      });
  
      socket.on('SEND_USER', data => {
        let user = data.user.username;
        onlineUsers.push(user);
        connections[user] = socket;
        console.log(socket.rooms);
        io.sockets.to(socket.id).emit('RECEIVE_USER', data);
      });

      socket.on('SEND_USER_LEFT', data => {
        let user = data.user.username;
        let roomNumber = data.roomNumber;
        onlineUsers.splice(onlineUsers.indexOf(user), 1);
        io.sockets.in("room-" + roomNumber).emit('RECEIVE_USER_LEFT', data);
      });

      socket.on('SEND_ROOM_NUMBER', data => {
        let roomno = 1;
        let usersInRoom = io.nsps['/'].adapter.rooms["room-" + roomno] && io.nsps['/'].adapter.rooms["room-" + roomno].length;
         //Increase roomno if 2 clients are present in a room.
        if(usersInRoom > 1) roomno++;
        data.roomNumber = roomno;
        socket.join("room-" + roomno);
        console.log(connections[data.user.username].rooms);

        //Send this event to everyone in the room.
        io.sockets.in("room-" + roomno).emit('RECEIVE_ROOM_NUMBER', data);
      });
  
    });
  };
  