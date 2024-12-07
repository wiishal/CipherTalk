import React, { createContext, useContext, useMemo,useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<any> = ({ children }) => {
  const socket = useMemo(() => {
    const token = localStorage.getItem("userToken");
    return token ? io("http://localhost:3000", { auth: { token } }) : null;
  }, []);
  
  useEffect(() => {
    // Cleanup socket connection on unmount
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [socket]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};
