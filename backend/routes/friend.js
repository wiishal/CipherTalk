const express = require('express')
const friendRouter = express.Router();
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
   
    res.status(200).json({userFind:user,msg:"success!"})
})

module.exports = friendRouter;