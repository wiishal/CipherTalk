const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const setUpSocket = (server) => {
  console.log("control reache here");
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }, 
  });

  io.on("connection", (socket) => {
    const token = socket.handshake.auth.token;
    const username = jwt.verify(token, process.env.jwtPassword);
    console.log(`${username.id} connected with socket ID: ${socket.id}`);
  });
};
 
module.exports = setUpSocket;
