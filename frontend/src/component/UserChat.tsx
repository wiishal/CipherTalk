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
interface Chat{
  id: Number; senderId: Number; receiverId: Number; content: String; timestamp: String;
}

interface msg{

}

const UserChat: React.FC<UserChatProps> = ({ socket }) => {
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [messages, setMessages] = useState<{ text: String; from: String }[]>(
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

  /*
0
: 
{id: 3, senderId: 2, receiverId: 3, content: 'hii', timestamp: '2024-10-03T15:11:05.205Z'}
1
: 
{id: 7, senderId: 3, receiverId: 2, content: 'hi', timestamp: '2024-10-10T15:58:52.748Z'} */

  useEffect(() => {
    if (socket) {
      socket.emit("register", username);
      const currentUserToken = localStorage.getItem("userToken");
      const targetUser = user;

      // Emit the fetch-chats event with both user IDs
      socket.emit("fetch-chats", { currentUserToken, targetUser });

      socket.on("chat-history", (chats) => {
        console.log("Received chat history:", chats);
        let msg: { text: String; from: string }[] = [];
        const recievedMsgUser = Number(user)
        chats.forEach((element : Chat) => {
          if (
            element.senderId == recievedMsgUser 
          ) {
            
            msg.push({ text: element.content, from: username });
          }
          else{
            msg.push({ text: element.content, from: "me" });
          }
        });
        setMessages(msg);
      });
      socket.on("receiveMessage", (data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.text, from: data.from },
        ]);
      });
      console.log(messages);
    }

  
  }, [username]);

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
