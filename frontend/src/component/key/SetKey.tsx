import { useEffect, useState } from "react";
import { checkKeyStatus, changeKeystatus } from "../../sevices/encryptServices";
import { generateKey } from "../../encryption/encryptionUtil";

const SetKey: React.FC<{
  setEncryptionKeySet: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setEncryptionKeySet }) => {
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
            setEncryptionKeySet(response.keystatus);
            setSetkeyAvailability(response.keystatus);
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
      alert("cant set empty key");
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
    <div className="absolute z-10 right-5 top-12 border border-slate-700 w-2/6 h-fit bg-neutral-900 p-4 rounded-xl font-medium ">
      <div className="flex p-2">
        <h1 className="text-neutral-200 text-sm">Generate key</h1>
      </div>
      <div className="flex gap-3">
        <input
          value={key}
          type={isShowPass ? "text" : "password"}
          readOnly
          className="rounded border bg-transparent border-transparent border-b-blue-700 text-wrap w-5/6 p-1 h-11 text-xs"
        />
        <button
          onClick={() => {
            setIsShowPass((prev) => !prev);
          }}
        >
          {isShowPass ? "Hide" : "Show"}
        </button>
      </div>
      <div className="flex p-2 my-6 gap-4 text-xs font-medium">
        {!keystatus ? (
          <button
            className="px-5 py-2 rounded-sm bg-blue-900"
            onClick={generateEncryptionkey}
          >
            Generate
          </button>
        ) : (
          <button className="p-2 rounded-sm bg-blue-900">
            already key is set Generate
          </button>
        )}
        <button
          className="border border-blue-500 px-5 py-2 "
          onClick={setKeyInsession}
        >
          Set Key{" "}
        </button>

        <button className="border border-blue-500 px-5 py-2 ">copy</button>
      </div>
      <div>{keystatus ? <p>key is set</p> : ""}</div>
    </div>
  );
};

export default SetKey;
