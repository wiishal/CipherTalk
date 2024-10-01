const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

const http = require('http')
const server = http.createServer(app);



const setupSocket = require("./routes/message"); 
const authRouter = require("./routes/auth");
const friendRouter = require("./routes/friend");



//routers
app.use("/auth", authRouter);
app.use("/Friend",friendRouter)

//creating server for socket
setupSocket(server)


server.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`http://localhost:${port}/`);
});
