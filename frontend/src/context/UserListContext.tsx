import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserListContextType {
  users: User[]; 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

interface User {
  username: string;
  userid: string;
}

const userList = createContext<UserListContextType | undefined>(undefined);

export const UserListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <userList.Provider value={{ users, setUsers }}>
      {children}
    </userList.Provider>
  );
};

export const useUserList = (): UserListContextType => {
  const context = useContext(userList);
  if (!context) {
    throw new Error("useUserList must be used within a UserListProvider");
  }
  return context;
};

export default userList;
