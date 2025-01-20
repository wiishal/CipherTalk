const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createUser, getUser } = require("../services/userService");

exports.login = async (req, res) => {
  console.log("req at login");
  const { userName, userPassword } = req.body;
  console.log(userName, userPassword);

  try {
    const user = await getUser(userName);
    if (!user) {
      res.json(401).json({ msg: "invalid Creadential" });
      return;
    }
    console.log(user);
    if (user.username == userName) {
      if (user.password == userPassword) {
        const token = jwt.sign(
          { username: user.username, id: user.id },
          process.env.jwtPassword
        );
        res.status(200).json({ token, msg: "User succesful login" });
        return;
      }

      res.status(401).json({ msg: "invalid password" });
      return;
    }
    res.json(401).json({ msg: "invalid Creadential" });
  } catch (error) {
    console.log("Error while Login User", error);
  }
  res.status(200).json({ message: "success" });
};

exports.signUp = async(req,res)=>{
    try {
        const { userName, userEmail, userPassword } = req.body;
        const isvalid = await creadentialCheck(userName, userEmail);

        if (isvalid) {
          const user = await createUser(userName, userEmail, userPassword);
          console.log(`user Created, id : ${user.id}`);
          const token = jwt.sign(
            { username: user.username, id: user.id },
            process.env.jwtPassword
          );
          res.status(200).json({ token, msg: "sign up successful" });
        }
    } catch (error) {
        res.status(401).json({message:"failed to sign up"})
    }

}