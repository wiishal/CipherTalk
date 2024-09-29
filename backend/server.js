const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;
const http = require('http')
const setupSocket = require("./routes/message"); 

require("dotenv").config();
const userRouter = require("./routes/user");

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("backend ChipherTalk")
})

app.use("/auth", userRouter);

//creating server for socket
const server = http.createServer(app);

setupSocket(server)


server.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`http://localhost:${port}/`);
});
