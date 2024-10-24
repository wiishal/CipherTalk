const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

//services
const { fetchChat }= require("../services/messageServices");

let users = {};

const setUpSocket = (server) => {
  console.log("Socket server initialized");
  const io = new Server(server, {
    cors: {
      origin: "*",
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
        users[user.id] = socket.id;
        console.log(`${user.id} registered with ID: ${socket.id}`);
      });

      socket.on("fetch-chats", async ({ senderUserToken, receiverUser }) => {
        try {
          let targetedUser = Number(receiverUser);
          const user = jwt.verify(senderUserToken, process.env.jwtPassword);
          const currenUser = Number(user.id);
          const userChats = await fetchChat(currenUser, targetedUser);

          socket.emit("chat-history", userChats);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      });

      socket.on("chat-message", (msg) => {
        console.log(msg, users);
        io.to(users[msg.toUser]).emit("receiveMessage", {
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
