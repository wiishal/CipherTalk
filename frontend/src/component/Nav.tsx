import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserList } from "../context/UserListContext";
import { getUsers } from "../sevices/userServices";

const Nav: React.FC<NavProps> = ({ userName }) => {
  const { users } = useUserList();
  const [usersList, setUserList] = useState<Users[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("userToken");
      try {
        if (token) {
          const userList = await getUsers(token);
          if (Array.isArray(userList)) {
            setUserList(userList);
          } else {
            setUserList([]);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUserList([]);
      }
    };

    fetchData();
  }, []);

  console.log(users);
  return (
    <div className="flex flex-col gap-1 bg-neutral-900 text-white  rounded-xl h-full w-1/6 justify-between pb-5 p-2">
      <div>
        <h4 className="text-xl m-1 border border-black capitalize font-semibold  border-b-neutral-300 p-2 b ">
          {userName ? userName : "Guest"}
        </h4>{" "}
        <div className="py-1">
          {users.map((item) => (
            <div className="border border-black bg-neutral-800 rounded-xl font-medium capitalize p-4">
              <Link to={`/user/${item.userid}`}>{item.username}</Link>
            </div>
          ))}

          {usersList.map((item) => (
            <div className="border border-black bg-neutral-800 rounded-xl font-medium capitalize p-4">
              <Link to={`/user/${item.id}`}>{item.username}</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link to={"/Search"}>Search</Link>

        <Link to="/setting">Setting</Link>
      </div>
    </div>
  );
};
interface NavProps {
  userName: string;
}
interface Users {
  id: number;
  username: string;
}

export default Nav;
