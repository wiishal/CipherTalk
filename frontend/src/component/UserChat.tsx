import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import SetKey from "./SetKey";
import { SetkeyAtSession } from "./SetkeyAtSession";
import {
  decryption,
  encryption,
  generateSalt,
} from "../encryption/encryptionUtil";
import { getUserDetails } from "../sevices/userServices";
import { checkKeyStatus } from "../sevices/encryptServices";

const UserChat: React.FC<UserChatProps> = ({ socket }) => {
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: String; from: String; encrypt: boolean; salt: string | null }[]
  >([]);

  const [encryptMode, setEncryptMode] = useState<boolean>(false);
  const [encryptMsg, setEncryptMsg] = useState<string>("");
  //checking isencryption is set for sending encryption text
  const [isEncryptionKeySet, setEncryptionKeySet] = useState<boolean>(false);
  const [isEncryptionKeySetDiv, setEncryptionKeySetDiv] =
    useState<boolean>(false);
  const [StoreKeyAtSession, SetStoreKeyAtSession] = useState<boolean>(false);

  const { user } = useParams<keyof RouteParams>();

  console.log(isEncryptionKeySet);
  useEffect(() => {
    const fetchAndSetup = async () => {
      const token = localStorage.getItem("userToken");

      try {
        // Fetch user details if token and user are available
        if (token && user) {
          const userDetails = await getUserDetails(token, user);
          if (userDetails) {
            setUsername(userDetails.username);

            // Set up socket events after username is available
            if (socket) {
              socket.emit("register", userDetails.username);

              // Emit the fetch-chats event with both user IDs
              socket.emit("fetch-chats", {
                senderUserToken: token,
                receiverUser: user,
              });

              // Listen for chat history and update messages state
              socket.on("chat-history", (chats) => {
                console.log("Received chat history:", chats);
                let msg: Msg[] = [];
                const recievedMsgUser = Number(user);

                chats.forEach((element: Chat) => {
                  if (element.senderId === recievedMsgUser) {
                    msg.push({
                      text: element.content,
                      from: userDetails.username,
                      encrypt: element.encrypt,
                      salt: element.salt,
                    });
                  } else {
                    msg.push({
                      text: element.content,
                      from: "me",
                      encrypt: element.encrypt,
                      salt: element.salt,
                    });
                  }
                });
                setMessages(msg);
              });

              // Listen for new incoming messages and add to messages state
              socket.on("receiveMessage", (data) => {
                console.log(data)
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    text: data.text,
                    from: data.from,
                    encrypt: data.encrypt,
                    salt: data.salt,
                  },
                ]);
              });
            }
          }
        }
      } catch (error) {
        alert("Error while getting details");
      }
    };

    fetchAndSetup();
  }, [user, socket]); // Dependencies: runs when `user` or `socket` changes

  const KeyStatus = async () => {
    const token = localStorage.getItem("userToken");
    try {
      if (token) {
        const response = await checkKeyStatus(token);
        if (response) {
          console.log(response);
          setEncryptionKeySet(response.keystatus);
        }
      }
    } catch (error) {
      alert("Error while geting keystatus");
    }
  };

  const sendMessage = () => {
    if (message.trim() && socket) {
      console.log(message);
      socket.emit("chat-message", {
        message:message,
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

  const enableEncryptionMode = () => {
    if (encryptMode === true) {
      setEncryptMode(false);
    } else {
      setEncryptMode(true);
      KeyStatus();
    }
  };

  const sendEncryptedMessage = async () => {
    if (isEncryptionKeySet === false) {
      alert("set encryption key");
      return;
    }
    if (encryptMsg === "") {
      alert("empty msg");
      return;
    }
    if (sessionStorage.getItem("keyforthesession")) {
      const msgsalt = await generateSalt();
      const key = sessionStorage.getItem("keyforthesession");
      if (key) {
        const encryptMsgstring = await encryption(key, msgsalt, encryptMsg);
        console.log("encryption :", encryptMsg, msgsalt, encryptMsgstring);
        if(!socket){
          alert("Connection error!")
          return;
        }
          console.log(message);
          socket.emit("chat-message", {
            message:encryptMsgstring,
            toUser: user,
            encrypt: true,
            salt: msgsalt,
          });

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: encryptMsgstring,
              from: "me",
              encrypt: true,
              salt: msgsalt,
            },
          ]);
          setMessage("");
        }
      }
     else {
      alert("key is not set");
      SetStoreKeyAtSession(true);
      return;
    }
  };

  return (
    <div className="size-full bg-neutral-900 text-white p-2">
      {isEncryptionKeySetDiv && (
        <SetKey setEncryptionKeySet={setEncryptionKeySet} />
      )}
      <div className="flex">
        <p className="text-3xl font-medium capitalize">{username}</p>
        {isEncryptionKeySet ? <p>key is set</p> : <p>key is not set</p>}
        <button
          className=" rounded-xl bg-blue-800 text-cyan-50 font-medium  p-2"
          onClick={enableEncryptionMode}
        >
          {" "}
          {encryptMode ? "Encryption Mode" : "Enable Encrypt"}{" "}
        </button>
      </div>
      <div className="flex-col h-5/6 p-3 bg-neutral-800 rounded-3xl overflow-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.from === "me" ? "text-blue-500 " : "text-green-500"
            }
          >
            {msg.encrypt ? (
              <div className="flex align-middle pt-1 w-fit">
                <p className="py-2">{msg.from === "me" ? "You: " : `${msg.from}: `}</p>
                <div
                  className="rounded py-2 w-fit bg-neutral-700 text-white"
                  onClick={() => console.log(msg.text)}
                >
                  Encrypted msg
                </div>
              </div>
            ) : (
              <p>
                {msg.from === "me" ? "You: " : `${msg.from}: `} {msg.text}
              </p>
            )}
          </div>
        ))}
      </div>
      {StoreKeyAtSession && (
        <SetkeyAtSession SetStoreKeyAtSession={SetStoreKeyAtSession} />
      )}
      {encryptMode ? (
        // for encryption
        <div className="flex  gap-1">
          <input
            className="text-white p-2 w-5/6 border rounded-3xl  border-green-400 bg-neutral-800"
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
      ) : (
        // normal text
        <div className="flex  gap-1">
          <input
            className="text-white p-2 w-5/6 border rounded-3xl bg-gray-900 "
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />

          <button
            className=" p-2  rounded-3xl bg-blue-600 text-white"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

interface RouteParams {
  user: String | "";
}
interface UserChatProps {
  socket: Socket | null;
}
interface Chat {
  id: Number;
  senderId: Number;
  receiverId: Number;
  content: String;
  timestamp: String;
  encrypt: boolean;
  salt: string | null;
}
interface Msg {
  text: String;
  from: string;
  encrypt: boolean;
  salt: string | null;
}
export default UserChat;
