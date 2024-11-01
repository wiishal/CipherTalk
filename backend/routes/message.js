const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

//middleware
const tokenAuthenticationMiddleware = require("../middleware/tokenAuthenticationMiddleware");
//services
const { fetchChat, insertChat } = require("../services/messageServices");

let users = {};

const setUpSocket = (server) => {
  console.log("Socket server initialized");
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
 
  //token verification
  // io.use(tokenAuthenticationMiddleware);

  io.on("connection", (socket) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.log("No token provided, disconnecting socket");
      return socket.disconnect();
    }

    try {
      const user = jwt.verify(token, process.env.jwtPassword);
      console.log(`User ${user.id} connected with socket ID: ${socket.id}`);

      //regitering user 
      socket.on("register", (username) => {
        users[user.id] = { socketId: socket.id, username: user.username };
        console.log(`${user.id} registered with ID: ${socket.id}`);
      });


      //fetching chat history
      socket.on("fetch-chats", async ({ senderUserToken, receiverUser }) => {
        try {
          
          let targetedUser = parseInt(receiverUser, 10);
          if (isNaN(targetedUser)) {
            socket.emit("chat-history", { error: "Invalid receiver user ID." });
            return;
          }
          const user = jwt.verify(senderUserToken, process.env.jwtPassword);
          const currenUser = Number(user.id);

          const userChats = await fetchChat(currenUser, targetedUser);
          if (!userChats) {
             socket.emit("chat-history", { message: "No chat history found." });
             return;
          }
          socket.emit("chat-history", userChats);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      });

      //sending event
      socket.on("chat-message", async(msg) => {

        if (!users[msg.toUser]){
          console.log("Returning from Chat-msg ")
          return;
        }

        //error handling require
        console.log(msg, users[msg.toUser].socketId , "currentuser",user);

          const recentChat = await insertChat(user.id, msg.toUser,msg.message)
          if(!recentChat){
            console.log('Error while chat Saving')
          }
          io.to(users[msg.toUser].socketId).emit("receiveMessage", {
            text: msg.message,
            from: user.username,
          });
      });

    } catch (err) {
      console.error("Invalid token, disconnecting socket:", err.message);
      socket.disconnect();
    }
  });
};

module.exports = setUpSocket;
