import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

interface RouteParams {
  user: String | "";
}
interface UserChatProps {
  socket: Socket | null;
}

const UserChat: React.FC<UserChatProps> = ({ socket }) => {
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [messages, setMessages] = useState<{ text: string; from: string }[]>(
    []
  ); // Storing both message text and sender info
  const url = "http://localhost:3000";
  const { user } = useParams<keyof RouteParams>();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .post(`${url}/Friend/verify`, {
        usertoken: token,
        userid: user,
      })
      .then((res) => {
        setUsername(res.data.userFind.username);
      })
      .catch((err) => {
        console.error("Error verifying user:", err);
      });
  }, [user]);

  useEffect(() => {
    if (socket) {
         const userId1 = username;
    const userId2 = user; 

    // Emit the fetch-chats event with both user IDs
    socket.emit("fetch-chats", { userId1, userId2 });
      socket.emit("register", username);
     

      socket.on("chat-history", (chats) => {
        console.log("Received chat history:", chats);
        setMessages(chats)
      });
      socket.on("receiveMessage", (data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.text, from: data.from },
        ]);
      });
      console.log(messages);
    }

    // Cleanup the listener when the component unmounts
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      console.log(message);

      socket.emit("chat-message", { message, toUser: user });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, from: "me" },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="size-full bg-gray-950 text-white">
      <h2>Chat with {username}</h2>
      <div className="flex-col  h-5/6">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={msg.from === "me" ? "text-blue-500" : "text-green-500"}
          >
            {msg.from === "me" ? "You: " : `${msg.from}: `} {msg.text}
          </p>
        ))}
      </div>
      <div className="flex  gap-1">
        <input
          className="text-black p-2"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />

        <button
          className=" p-2 rounded-md bg-blue-600 text-white"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;
