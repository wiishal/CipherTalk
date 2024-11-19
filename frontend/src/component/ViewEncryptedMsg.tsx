import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { decryption } from "../encryption/encryptionUtil";

export const ViewEncryptionMsg: React.FC<{
  encryptedMsg?: Msg;
  setEncryptMsgView: Dispatch<SetStateAction<boolean>>;
  SetStoreKeyAtSession: Dispatch<SetStateAction<boolean>>;
}> = ({ encryptedMsg, setEncryptMsgView, SetStoreKeyAtSession }) => {
  const [isKeySet, setIsKeySet] = useState<boolean>(false);
  const [CurrentMsgKey, setCurrentMsgKey] = useState<string>("");
  const [keyValue,setKeValue] = useState<string>("")

  useEffect(() => {
    if (encryptedMsg?.from == "me") {
      let key = sessionStorage.getItem("keyforthesession");
      if (key) {
        setCurrentMsgKey(key);
        setIsKeySet(true);
      } else {
        alert("your key is not set");
        SetStoreKeyAtSession(true);
      }
    }
  });

  if (!encryptedMsg) {
    return null;
  }
  
  function setSenderKey(){
    console.log(keyValue)
    setCurrentMsgKey(keyValue)
    setIsKeySet(true)
  };
  async function decryptmsg() {
    if (encryptedMsg?.from == "me" && isKeySet && encryptedMsg.salt) {
      let msg = await decryption(
        CurrentMsgKey,
        encryptedMsg.salt,
        encryptedMsg.text
      );
      console.log(msg);
    } else {
      if (isKeySet && encryptedMsg?.salt) {
        let msg = await decryption(
          CurrentMsgKey,
          encryptedMsg.salt,
          encryptedMsg.text
        );
        console.log(msg);
      } else {
        alert("set senders key");
      }
    }
  }

  return (
    <div className="absolute right-1 border h-5/6 w-1/3 p-4 rounded-3xl bg-neutral-900">
      <button
        className="mb-2 bg-blue-900 p-2 rounded-md font-medium"
        onClick={() => {
          setEncryptMsgView(false);
        }}
      >
        {" "}
        Close{" "}
      </button>
      <h2 className="text-lg font-bold">Message Details</h2>
      <p>
        <strong>From:</strong> {encryptedMsg.from}
      </p>
      <p>
        <strong>Text:</strong> {encryptedMsg.text}
      </p>
      {encryptedMsg.encrypt && (
        <p>
          <strong>Encryption Salt:</strong>{" "}
          {encryptedMsg.salt || "Not available"}
        </p>
      )}
      {encryptedMsg.from != "me" && (
        <div className="">
          <p className="text-lg font-bold">key</p>{" "}
          <input
            value={keyValue}
            className="rounded p-2 bg-neutral-600 text-white w-4/5"
            placeholder="enter Senders key here!"
            onChange={(e) => {
              setKeValue(e.target.value);
            }}
          ></input>
          <button
            className=" p-2 my-1 rounded-1xl bg-blue-600 text-white"
            onClick={setSenderKey}
          >
            Set Key
          </button>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={decryptmsg}
          className=" p-2  rounded-1xl bg-blue-600 text-white"
        >
          Decrypt{" "}
        </button>
      </div>
    </div>
  );
};

interface Msg {
  text: string;
  from: string;
  encrypt: boolean;
  salt: string | null;
}
