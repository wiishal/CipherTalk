const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function storeencryptedMessage(currentUser, receiveMessageUser, messageText,messageSalt) {
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
        encrypt:true,
        salt:messageSalt
      },
    });
    return newChat;
  } catch (error) {
    console.log("Error while Creating chat", error);
    return false;
  }
}

module.exports = {storeencryptedMessage};