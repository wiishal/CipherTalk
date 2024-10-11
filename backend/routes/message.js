const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const setUpSocket = (server) => {
  console.log("Socket server initialized");

  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust for production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.log("No token provided, disconnecting socket");
      return socket.disconnect();
    }

    try {
      const user = jwt.verify(token, process.env.jwtPassword);
      console.log(`User ${user.id} connected with socket ID: ${socket.id}`);

      socket.on("chat-message", (msg) => {
        console.log("message: " + msg.message);
        io.emit("receiveMessage", { message: msg.message, fromUser: "all" });
      });

      socket.on("disconnect", () => {
        console.log(`User ${user.id} disconnected`);
        
      });
    } catch (err) {
      console.error("Invalid token, disconnecting socket:", err.message);
      socket.disconnect();
    }
  });
};

module.exports = setUpSocket;
