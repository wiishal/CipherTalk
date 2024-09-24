import React from "react";
import { Link } from "react-router-dom";

interface NavProps {
  userName: string;
}

const Nav: React.FC<NavProps> = ({ userName }) => {
 
  return (
    <div className="flex flex-col gap-1 bg-slate-400 h-full w-1/6">
      <h4 className="text-3xl m-1">{userName ? userName : "Guest"}</h4>{" "}
     {/* user list */}
     <Link to="/setting">Setting</Link>
    </div>
  );
};

export default Nav;
