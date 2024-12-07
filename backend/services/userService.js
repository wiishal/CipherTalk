const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createUser(userName, email, password) {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: userName,
        email: email,
        password: password,
      },
    });

    return newUser;
  } catch (error) {
    console.log("Error While Creating user", error);
  }
}

async function verifyUser(userid) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userid,
      },
    });
    return user;
  } catch (error) {
    console.log("error while Verifying User");
    return false;
  }
}
async function getUsers(currentUser) {
  try {
    const userlist = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUser.id }, 
          { receiverId: currentUser.id }, 
        ],
      },
      select: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    const uniqueUsersMap = new Map();

    userlist.forEach((message) => {
      if (message.sender.id !== currentUser.id) {
        uniqueUsersMap.set(message.sender.id, message.sender);
      }
      if (message.receiver.id !== currentUser.id) {
        uniqueUsersMap.set(message.receiver.id, message.receiver);
      }
    });

    // Convert map to an array of unique users
    const uniqueUsers = Array.from(uniqueUsersMap.values());
    return uniqueUsers;
  } catch (error) {
    console.log("Error While getting User", error);
    return false;
  }
}
async function searchUser(query) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: query,
      },
    });

    return user;
  } catch (error) {
    console.log("Error While Searching User", error);
    return false;
  }
}

async function getUser(userName) {
  try {
    const user = prisma.user.findUnique({
      where: {
        username: userName,
      },
    });

    return user;
  } catch (error) {
    console.log("Error while getting User", error);
    return false;
  }
}

async function checkKeyStatus(userId) {
  try {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        keyStatus: true,
      },
    });

    return user;
  } catch (error) {
    console.log("Error while checkKeyStatus", error);
  }
}

async function setKeyStatus(userId) {
  try {
    const user = prisma.user.update({
      where: {
        id: userId,
      },
      data:{
        keyStatus:true,
      },
    });

    return user;
  } catch (error) {
    console.log("Error while checkKeyStatus", error);
  }
}
module.exports = {
  createUser,
  verifyUser,
  getUsers,
  searchUser,
  getUser,
  checkKeyStatus,
  setKeyStatus,
};
