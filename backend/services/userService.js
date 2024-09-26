const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createUser(userName, email, password) {
  const newUser = await prisma.user.create({
    data: {
      username: userName,
      email: email,
      password: password,
    },
  });

  return newUser.id;
}

module.exports = createUser;
