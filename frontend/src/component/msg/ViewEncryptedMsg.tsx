import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { decryption } from "../../encryption/encryptionUtil";

export const ViewEncryptionMsg: React.FC<{
  encryptedMsg?: Msg;
  setEncryptMsgView: Dispatch<SetStateAction<boolean>>;
  SetStoreKeyAtSession: Dispatch<SetStateAction<boolean>>;
}> = ({ encryptedMsg, setEncryptMsgView, SetStoreKeyAtSession }) => {
  const [isKeySet, setIsKeySet] = useState<boolean>(false);
  const [CurrentMsgKey, setCurrentMsgKey] = useState<string>("");
  const [keyValue, setKeValue] = useState<string>("");

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

  function setSenderKey() {
    console.log(keyValue);
    setCurrentMsgKey(keyValue);
    setIsKeySet(true);
  }
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
    <div className="absolute right-1 border h-2/3 w-1/3 p-4 rounded-3xl bg-neutral-900 text-sm font-medium text-neutral-200">
      <div className="flex justify-between items-center border border-transparent border-b-neutral-200">
        <h2 className="text-sm font-medium">Message Details</h2>
        <button
          className="mb-2 px-4 py-2 bg-blue-900  rounded-md font-medium "
          onClick={() => {
            setEncryptMsgView(false);
          }}
        >
          {" "}
          Close{" "}
        </button>
      </div>
      <div className="flex flex-col m-3">
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
          <div className="flex flex-col gap-2 my-3 border border-transparent border-t-neutral-400">
            <p className="text-sm">key</p>{" "}
            <div className="flex flex-row gap-3">
              <input
                value={keyValue}
                className="rounded p-2 bg-neutral-600 text-white w-4/5"
                placeholder="enter Senders key here!"
                onChange={(e) => {
                  setKeValue(e.target.value);
                }}
              ></input>
              <button
                className="border border-neutral-300 px-4 py-1 my-1 rounded-1xl  text-white"
                onClick={setSenderKey}
              >
                Set
              </button>
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={decryptmsg}
            className=" px-4 py-1 bg-blue-800 text-white"
          >
            Decrypt{" "}
          </button>
        </div>
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
