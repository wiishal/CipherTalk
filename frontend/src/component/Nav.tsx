import React from "react";

// Define the props interface for Nav
interface NavProps {
  userName: string;
}

const Nav: React.FC<NavProps> = ({ userName }) => {
  // Destructure userName directly
  return (
    <div className="flex flex-col gap-1 bg-slate-400 h-full w-1/6">
      <h4 className="text-3xl m-1">{userName ? userName : "Guest"}</h4>{" "}
     {/* user list */}
      <h4>Setting</h4>
    </div>
  );
};

export default Nav;
