import { useEffect, useState } from "react";
import Login from "./auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./page/Chat";
import SignUp from "./auth/SignUp";
import { UserListProvider } from "./context/UserListContext";
import { SocketProvider } from "./context/SocketContext";
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    async function checkToken() {
      try {
        if (token) {
          const response = await axios.post(
            `http://localhost:3000/auth/verifyToken`,
            {
              usertoken: token,
            }
          );
          if (response) {
            setIsLoggedIn(true);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("error while log in");
      }
    }
    checkToken();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen bg-neutral-900">
      <BrowserRouter>
        {!isLoggedIn ? (
          <Routes>
            <Route
              path="/"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            ></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
          </Routes>
        ) : (
          <div className="flex flex-row h-full">
            <UserListProvider>
              <SocketProvider>
                <Chat />
              </SocketProvider>
            </UserListProvider>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}
