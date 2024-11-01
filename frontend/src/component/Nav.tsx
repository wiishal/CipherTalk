import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserList } from "../context/context";
import axios from "axios";
interface NavProps {
  userName: string;
}
interface Users {
  id: number;
  username: string;
}

const Nav: React.FC<NavProps> = ({ userName }) => {
  const { users } = useUserList();
  const [usersList, setUserList] = useState<Users[]>([]);
  const url = "http://localhost:3000";

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .post(`${url}/Friend/get-Users`, {
        usertoken: token,
      })
      .then((res) => {
        console.log(res.data.data);
        console.log(typeof res.data.data.timestamp);
        setUserList(res.data.data); 
      });
  }, []);

  console.log(users);
  return (
    <div className="flex flex-col gap-1 bg-black text-white h-full w-1/6 justify-between pb-5 p-3">
      <div>
        <h4 className="text-3xl m-1">{userName ? userName : "Guest"}</h4>{" "}
        <div className="py-1">
          {usersList.map((item) => (
            <Link to={`/user/${item.id}`}>{item.username}</Link>
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

export default Nav;
