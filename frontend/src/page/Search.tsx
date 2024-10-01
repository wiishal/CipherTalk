import axios from "axios";
import { useState } from "react";

const Search: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const url = "http://localhost:3000";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  function seachQuery() {
    const token = localStorage.getItem("userToken")
    axios
      .post(`${url}/Friend/search`, {
        usertoken: token,
        query: input,
      })
      .then((res) => console.log(res.data.userFind));
  }
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
      </div>
    </div>
  );
};

export default Search;
