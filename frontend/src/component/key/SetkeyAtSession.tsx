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
    <div className="absolute bg-neutral-900 h-2/6 w-2/6 p-4 z-10 bottom-20 m-2 text-sm font-medium">
      <div className="flex flex-col m-3">
        <p>Paste "your" key here!</p>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="rounded border bg-transparent border-transparent border-b-blue-700 text-wrap w-5/6 p-1 h-11 text-xs"
        />
      </div>
      <div className="flex gap-3 my-4 mx-3 text-xs">
        <button
          onClick={SetkeyAtSession}
          className="border px-5 py-2 rounded-sm"
        >
          Set Key{" "}
        </button>
        <button
          onClick={() => {
            SetStoreKeyAtSession(false);
          }}
          className="border px-5 py-1 rounded-sm "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
