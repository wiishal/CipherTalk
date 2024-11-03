import { useEffect, useState } from "react";
import Login from "./auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./page/Chat";
import SignUp from "./auth/SignUp";
import { UserListProvider } from "./context/context"; 


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const usertoken = localStorage.getItem("userToken");
    if (usertoken) {
      setIsLoggedIn(true);
      console.log(setIsLoggedIn)
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen">
      {!isLoggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            ></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="flex flex-row h-full">
          <BrowserRouter>
          <UserListProvider>
            <Chat />
          </UserListProvider>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}
