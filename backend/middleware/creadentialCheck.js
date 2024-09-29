const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function creadentialCheck(userName, email) {
  const user = await prisma.user.findUnique({
    where: {
      username: userName,
    },
  });

  if (user) {
    return false;
  }

  const Existingemail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (Existingemail) {
    return false;
  }

  return true;
}

module.exports = creadentialCheck;
