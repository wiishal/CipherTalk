import { Dispatch, SetStateAction, useState } from "react";
import { useSocket } from "../../context/SocketContext";

export const NormalTextInput: React.FC<props> = ({ setMessages,user }) => {
  const socket = useSocket();
  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    if (message.trim() && socket) {
      console.log(message);
      socket.emit("chat-message", {
        message: message,
        toUser: user,
        encrypt: false,
        salt: null,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message,
          from: "me",
          encrypt: false,
          salt: null,
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="flex w-full m-3 rounded-b-md items-start ">
      <input
        className="text-white px-4 py-2 mx-2 w-11/12 mb-2 border rounded-3xl bg-transparent"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />

      <button
        className=" p-2  text-blue-400"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

interface props {
  setMessages: Dispatch<SetStateAction<Msg[]>>;
  user: string | undefined;
}
interface Msg {
  text: string;
  from: string;
  encrypt: boolean;
  salt: string | null;
}