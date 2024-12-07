import { Dispatch, SetStateAction } from "react";


export const EncryptionTextInput: React.FC<props> = ({
    encryptMsg,
  setEncryptMsg,
  sendEncryptedMessage,
  setEncryptionKeySetDiv,
  isEncryptionKeySetDiv,
}) => {
    
  return (
    <div className="flex w-full bg-neutral-800 rounded-b-md">
      <input
        className="text-white p-2 m-1 w-5/6 border rounded-3xl  border-green-400 bg-neutral-800"
        type="text"
        value={encryptMsg}
        onChange={(e) => setEncryptMsg(e.target.value)}
        placeholder="Type your message"
      />
      <button
        className=" p-2  rounded-3xl bg-blue-600 text-white"
        onClick={sendEncryptedMessage}
      >
        Send
      </button>

      <button
        onClick={() => setEncryptionKeySetDiv((prev) => !prev)}
        className="bg-red-800 text-white p-2 rounded-xl capitalize"
      >
        {isEncryptionKeySetDiv ? "Cancel" : "Set Key"}
      </button>
    </div>
  );
};

interface props {
  encryptMsg: string;
  sendEncryptedMessage: () => Promise<void>;
  setEncryptMsg: Dispatch<SetStateAction<string>>;
  setEncryptionKeySetDiv: Dispatch<SetStateAction<boolean>>;
  isEncryptionKeySetDiv: boolean;
}