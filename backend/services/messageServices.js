const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function fetchChat(currenUser, targetedUser) {
  try {
    const userChats = await prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [{ senderId: currenUser }, { receiverId: targetedUser }],
          },
          {
            AND: [{ senderId: targetedUser }, { receiverId: currenUser }],
          },
        ],
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    return userChats;
  } catch (error) {
    console.log("Error while Fetching chats", error);
    return false
  }
}

async function insertChat(currentUser, receiveMessageUser,message) {
  try {
    const newChat = prisma.message.create({
      data: {
        senderId: currentUser,
        receiverId: receiveMessageUser,
        content: message,
      },
    });
    return newChat;
  } catch (error) {
    console.log("Error while Creating chat", error);
    return false
  }
}


module.exports = { fetchChat, insertChat };