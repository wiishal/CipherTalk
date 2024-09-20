import { useEffect, useState } from "react";
import Login from "./auth/Login";
import Nav from "./component/Nav";
import Chat from "./page/Chat";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const usertoken = localStorage.getItem("userToken");
    if (usertoken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen">
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div className="flex flex-row h-full">
          <Chat />
        </div>
      )}
    </div>
  );
}
