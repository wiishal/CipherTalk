import { useEffect, useState } from "react";
import Nav from "../component/Nav";
import { io, Socket } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import SignUp from "../auth/SignUp"
import Setting from "../page/Setting";
import axios from "axios";
import UserChat from "../component/UserChat";
import Home from "../component/Home";

function Chat() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .post(`http://localhost:3000/auth/verifyToken`, {
        usertoken: token,
      })
      .then((response) => {
        console.log(response.data.UserToken.user);
        setUserName(response.data.UserToken.user);
      })
      .catch(() => {
        console.log("error while authentication");
        localStorage.removeItem("userToken");
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const newSocket = io("http://localhost:3000", {
      auth: { token: token },
    });
    console.log("connected!", newSocket);

    newSocket.on("connect", () => {
      console.log(`Connected with socket ID: ${newSocket.id}`);
    });
  }, []);

  return (
    <>
      <Nav userName={userName || "Guest"} />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/user/:user" element={<UserChat/>}></Route>
        <Route path="/setting" element={<Setting/>}></Route>
      </Routes>
    </>
  );
}

export default Chat;
