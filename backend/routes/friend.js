const express = require('express')
const friendRouter = express.Router();
const jwt = require('jsonwebtoken')
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const tokenAuthenticationMiddleware = require('../middleware/tokenAuthenticationMiddleware');



friendRouter.post('/search',tokenAuthenticationMiddleware, async (req,res)=>{

    const query = req.body.query;
    const user = await prisma.user.findFirst({
      where: {
        username: query,
      },
    });
   const userFind = {username:user.username,userid:user.id}
    res.status(200).json({userFind,msg:"success!"})
})

friendRouter.post('/verify',tokenAuthenticationMiddleware,async(req,res)=>{

  const receivedUserid = req.body.userid;
  const userid = Number(receivedUserid);
  const user = await prisma.user.findFirst({
    where: {
      id: userid,
    },
  });
  const userFind = { username: user.username, userid: user.id };
  res.status(200).json({ userFind, msg: "success!" });
})

friendRouter.post('/get-Users',tokenAuthenticationMiddleware,async(req,res)=>{
    const usertoken = req.body.usertoken;
    const currentUser = jwt.verify(usertoken, process.env.jwtPassword);
    try {
      const userlist = await prisma.message.findMany({
        where: {
          receiverId: currentUser.id, 
        },
        select: {
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        distinct: ["senderId"], 
      });

      const uniqueUsers = userlist.map((message) => message.sender);

      res.status(200).json({
        success: true,
        data: uniqueUsers,
      });
    } catch (error) {
    
      res.status(500).json({
        success: false,
        message: "Error retrieving user list",
        error: error.message,
      });
    }
})
module.exports = friendRouter;