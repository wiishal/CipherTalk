import axios from "axios";
import { useState } from "react";
import { useUserList } from "../context/context";

interface User {
  username: string;
  userid: string;
}
const Search: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const url = "http://localhost:3000";
  const [searchResult, setSearchresult] = useState<User[]>([]);
  const { users, setUsers } = useUserList();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  function seachQuery() {
    const token = localStorage.getItem("userToken");
    axios
      .post(`${url}/Friend/search`, {
        usertoken: token,
        query: input,
      })
      .then((res) => {
        console.log(res.data.userFind);
        setSearchresult([...searchResult, res.data.userFind]);
      });
  }
  const addUser = (user: User) => {
    console.log(user)
    setUsers([...users, user]); 
  };
  return (
    <div className="size-full bg-gray-950 text-white">
      <div className="m-3">
        <h4 className="m-4">Search your Friend</h4>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-1/5 m-4 text-black bg-white rounded"
        />{" "}
        <button
          className="bg-blue-700  text-white p-2 rounded"
          onClick={seachQuery}
        >
        Search
        </button>
        <div>
          {searchResult.map((item) => (
            <div
              className="flex justify-between w-1/3 m-3 text-white p-2 h-1/3 bg-slate-600"
              key={item.userid}
            >
              <h4 className="m-1">{item.username}</h4>
              <button className="bg-blue-500 p-1 rounded" onClick={()=>addUser(item)}>
                msg
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
