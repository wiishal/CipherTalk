import { useState } from "react";

const Search: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div className="size-full bg-gray-950 text-white">
      <div className="m-3">
        <h4 className="m-4">Search your Friend</h4>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-1/5 m-4 bg-slate-500"
        />
      </div>
    </div>
  );
};

export default Search;
