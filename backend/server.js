const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

require("dotenv").config();
const userRouter = require("./routes/authentication");

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("backend ChipherTalk")
})

app.use("/auth", userRouter);


app.listen(port, () => {
  console.log(`app listening on port ${port}` );
  console.log(` http://localhost:${port}/`);
});
