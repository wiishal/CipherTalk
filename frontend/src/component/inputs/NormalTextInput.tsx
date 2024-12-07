import { Dispatch,SetStateAction } from "react";

export const NormalTextInput: React.FC<props> = ({
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <div className="flex w-full bg-neutral-800 rounded-b-md ">
      <input
        className="text-white p-2 mx-2 w-11/12 mb-2 border rounded-3xl bg-transparent"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />

      <button
        className=" p-2 rounded-3xl bg-blue-600 text-white"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

interface props {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
}
