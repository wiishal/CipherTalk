import { useEffect, useState } from "react";
import axios from "axios";

const SetKey: React.FC<SetKeyProps> = ({ setEncryptionKeySet }) => {
  const url = "http://localhost:3000";
  const [key, SetKey] = useState<string>("")
  const [isShowPass,setIsShowPass] = useState<boolean>(false);
  const [keystatus,setKeystatus] = useState<boolean>(false);

  useEffect(()=>{
     const token = localStorage.getItem("userToken");
     
     axios
       .post(`${url}/encrypt/verifyKetStatus`, {
         usertoken: token,
       })
       .then((res) => {
         console.log(res.data);
         setEncryptionKeySet(res.data.keystatus);
         // setKeystatus(res.data.keystatus);
         setKeystatus(true);
         setEncryptionKeySet(true);
       })
       .catch((err) => {
         console.error("Error verifying key status:", err);
       });
  },[])
  function generateKey(){

  }

  return (
    <div className="absolute z-10 right-5 top-12 border border-slate-700 size-2/6 bg-neutral-900 p-4 rounded-xl">
      <div className="flex p-2">
        <h1 className="text-neutral-200">Generate Key</h1>
      </div>
      <div className="flex gap-3">
        <input
          value={key}
          type={isShowPass ? "text" : "password"}
          readOnly
          className="rounded bg-neutral-700 text-wrap"
        />
        <button
          onClick={() => {
            setIsShowPass((prev) => !prev);
          }}
        >
          {isShowPass ? "Hide" : "Show"}
        </button>
      </div>
      <div className="p-2 my-6">
        {!keystatus ? (
          <button className="p-2 rounded-sm bg-blue-900" onClick={generateKey}>
            Generate
          </button>
        ) : (
          <button className="p-2 rounded-sm bg-blue-900" onClick={generateKey}>
            already key is set Generate
          </button>
        )}
      </div>
    </div>
  );
};

interface SetKeyProps {
  setEncryptionKeySet: React.Dispatch<React.SetStateAction<boolean>>;
}
export default SetKey;
