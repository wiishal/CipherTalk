import { useState } from "react";
import React, { Dispatch, SetStateAction } from "react";

interface setkeyprops {
  SetStoreKeyAtSession: Dispatch<SetStateAction<boolean>>;
}
export const SetkeyAtSession: React.FC<setkeyprops> = ({ SetStoreKeyAtSession }) => {
  const [key, setKey] = useState<string>("");
  function SetkeyAtSession() {
    if (key === "") {
      alert("Paste the key");
      return;
    }
    alert(
      "Your key is set for this session! make sure you enter key correctly"
    );
    sessionStorage.setItem("keyforthesession", key);
    SetStoreKeyAtSession(false)
  }

  return (
    <div className="absolute border h-2/6 w-2/6 p-3 z-10 bottom-20 m-2">
      <p>Paste the key here!</p>
      <h1>set the key at session</h1>
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="text text-wrap w-5/6 p-1 h-11 bg-neutral-700"
      />
      <br />
      <button
        onClick={SetkeyAtSession}
        className="p-2 bg-blue-500 m-1 rounded-sm"
      >
        Set Key{" "}
      </button>
      <button onClick={()=>{SetStoreKeyAtSession(false)}} className="m-1 bg-red-700 p-2 rounded-sm">cancel</button>
    </div>
  );
};
