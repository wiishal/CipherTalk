import { useEffect, useState } from "react";
import Nav from "../component/Nav";

import { Routes, Route } from "react-router-dom";
import Setting from "../page/Setting";
import axios from "axios";
import UserChat from "../component/UserChat";
import Home from "./Home";
import Search from "./Search";

function Chat() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .post(`http://localhost:3000/auth/verifyToken`, {
        usertoken: token,
      })
      .then((response) => {
        console.log(response.data.UserToken.username);
        setUserName(response.data.UserToken.username);
      })
      .catch(() => {
        console.log("error while authentication");
        localStorage.removeItem("userToken");
      });
  }, []);


  return (
    < >
      <Nav userName={userName || "Guest"} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Search" element={<Search />}></Route>
        <Route
          path="/user/:user"
          element={<UserChat />}
        ></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
    </>
  );
}

export default Chat;
