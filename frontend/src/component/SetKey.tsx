import { useEffect, useState } from "react";
import { checkKeyStatus, changeKeystatus } from "../sevices/encryptServices";
import { generateKey } from "../encryption/encryptionUtil";

const SetKey: React.FC = () => {
  const [key, SetKey] = useState<string>("");
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [keystatus, setKeystatus] = useState<boolean>(false);
  const [setkeyAvailability, setSetkeyAvailability] = useState<boolean>(false);

  useEffect(() => {
    const fetchkeyStatus = async () => {
      const token = localStorage.getItem("userToken");
      try {
        if (token) {
          const response = await checkKeyStatus(token);
          if (response) {
            setKeystatus(response.keystatus);
            setSetkeyAvailability(!response.keystatus);
          }
        }
      } catch (error) {
        alert("Error while geting keystatus");
      }
    };

    fetchkeyStatus();
  }, []);

  async function generateEncryptionkey() {
    const key = await generateKey();
    if (key) SetKey(key);
  }

  async function setKeyInsession() {
    if (setkeyAvailability === true) {
      alert("can set from here");
      return;
    }
    if (key === "") {
      alert("can set empty key");
      return;
    }
    alert("Are You Sure !! You Wanted to Set Encyption Key");
    const token = localStorage.getItem("userToken");
    try {
      if (token) {
        const responce = await changeKeystatus(token);
        if (responce) {
          setKeystatus(responce.keystatus);
        }
      }
    } catch (error) {
      alert("something wrong!happend while seting key status");
    }
    sessionStorage.setItem("keyforthesession", key);
    alert("key is set");
    alert("it only set for the current session");
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
          className="rounded bg-neutral-700 text-wrap w-5/6 p-1 h-11"
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
          <button
            className="p-2 rounded-sm bg-blue-900"
            onClick={generateEncryptionkey}
          >
            Generate
          </button>
        ) : (
          <button className="p-2 rounded-sm bg-blue-900">
            already key is set Generate
          </button>
        )}
        <button onClick={setKeyInsession}>Set Key </button>
      </div>
      <div>{keystatus ? <p>key is set</p> : <p>key is not set</p>}</div>
    </div>
  );
};

export default SetKey;
