// npm imports
const Server = require("socket.io").Server;

let socketIO = "";

exports.createSocketIO = async (server) => {
  socketIO = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  });

  socketIO.on("connection", async (socket) => {
    // connection
    socket.emit("connection", socket.id);

    socket.on("userUpdater", async (userId) => {
      console.log("Connection");
      // joining the user to rooms
      socket.join(userId);
      // code after successful connection can be written here
      // ...
    });

    socket.on("diconnectonlogout", (data) => {});

    socket.on("testing", (data) => {
      console.log("Socket runner");
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("disconnecting", async (reason) => {
      // disconnection
      console.log("disconnection");
    });
  });
};

exports.socketEmitAll = (type, data) => {
  try {
    socketIO.emit(type, data);
  } catch (err) {
    console.log(err);
  }
};

exports.socketEmitOne = (type, data, userId) => {
  try {
    socketIO.sockets.in(userId).emit(type, data);
  } catch (err) {
    console.log(err);
  }
};
