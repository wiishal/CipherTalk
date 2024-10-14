const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let users ={}

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

     socket.on("register", (username) => {
       users[user.id] = socket.id; // Map the username to the socket ID
       console.log(`${user.id} registered with ID: ${socket.id}`);
     });

     socket.on("chat-message",(msg)=>{
      console.log(msg,users)
         io.to(users[msg.toUser]).emit("receiveMessage", {
           text: msg.message, // The message text sent by the user
           from: user.id, // The user ID of the sender
         });
     });


     
    } catch (err) {
      console.error("Invalid token, disconnecting socket:", err.message);
      socket.disconnect();
    }
  });
};

module.exports = setUpSocket;
