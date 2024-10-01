import React, { useState } from "react";
import { Link } from "react-router-dom";

interface NavProps {
  userName: string;
}

const Nav: React.FC<NavProps> = ({ userName }) => {

 const user = "vish";
  return (
    <div className="flex flex-col gap-1 bg-black text-white h-full w-1/6">
      <div>
        <h4 className="text-3xl m-1">{userName ? userName : "Guest"}</h4>{" "}

       <div className="">
        <Link to={"/Search"}>Search</Link>
        </div>
      </div>
      <div>
        <Link to={`/user/${user}`}>{user}</Link>
      </div>
      {/* user list */}
      <Link to="/setting">Setting</Link>
    </div>
  );
};

export default Nav;
