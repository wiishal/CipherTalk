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
  }
}


module.exports = {fetchChat}