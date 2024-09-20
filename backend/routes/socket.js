const { Server } = require("socket.io");


const setUpSocket = (server) => {
    console.log("control reache here")
  const io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New user connected with socket ID: ${socket.id}`);
  });
};



module.exports = setUpSocket;
