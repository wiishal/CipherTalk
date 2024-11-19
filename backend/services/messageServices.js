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
    return false;
  }
}

async function insertChat(currentUser, receiveMessageUser, messageText,msgEncryptStatus,msgSalt) {
  console.log(
    `sender : ${currentUser} received : ${receiveMessageUser} msg : ${messageText}`
  );

  const receiver = parseInt(receiveMessageUser, 10);
  console.log(typeof currentUser, typeof receiver);

  try {
    const newChat = prisma.message.create({
      data: {
        senderId: currentUser,
        receiverId: receiver,
        content: messageText,
        encrypt: msgEncryptStatus,
        salt: msgSalt,
      },
    });
    return newChat;
  } catch (error) {
    console.log("Error while Creating chat", error);
    return false;
  }
}

module.exports = { fetchChat, insertChat };
