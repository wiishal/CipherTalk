
import { useEffect, useState } from "react";
import Nav from "../component/Nav";
import { io, Socket } from "socket.io-client";
import axios from "axios";

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
  useEffect(()=>{
   const newSocket = io("http://localhost:3000");
   console.log("connected!", newSocket);

    newSocket.on("connect", () => {
      console.log(`Connected with socket ID: ${newSocket.id}`);
    });
  },[])

  return (
    <>
      <Nav userName={userName || "Guest"} />
    </>
  );
}

export default Chat;
