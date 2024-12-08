import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import SetKey from "./key/SetKey";
import { SetkeyAtSession } from "./key/SetkeyAtSession";
import { getUserDetails } from "../sevices/userServices";
import { checkKeyStatus } from "../sevices/encryptServices";
import { ViewEncryptionMsg } from "./msg/ViewEncryptedMsg";
import { RenderMsg } from "./msg/RenderMsg";
import { EncryptionTextInput } from "./inputs/EncryptionTextInput";
import { NormalTextInput } from "./inputs/NormalTextInput";

const UserChat: React.FC = () => {
  const socket = useSocket();
  const { user } = useParams<keyof RouteParams>();
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [encryptMode, setEncryptMode] = useState<boolean>(false);
  const [isEncryptionKeySet, setEncryptionKeySet] = useState<boolean>(false);
  const [isEncryptionKeySetDiv, setEncryptionKeySetDiv] =
    useState<boolean>(false);
  const [StoreKeyAtSession, SetStoreKeyAtSession] = useState<boolean>(false);
  const [encryptMsgView, setEncryptMsgView] = useState<boolean>(false);
  const [msgView, SetMsgView] = useState<Msg>();



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
                console.log(data);
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
    return () => {
      if (socket) {
        socket.off("chat-history");
        socket.off("receiveMessage");
      }
    };
  }, [user, socket]);

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

  const enableEncryptionMode = () => {
    if (encryptMode === true) {
      setEncryptMode(false);
    } else {
      setEncryptMode(true);
      KeyStatus();
    }
  };

  function openEncryptedMsg(msg: Msg) {
    if (msg) {
      setEncryptMsgView(true);
      SetMsgView(msg);
    }
    console.log(msg);
  }

  return (
    <div className="size-full bg-neutral-900 text-white p-2 mr-5">
      {isEncryptionKeySetDiv && (
        <SetKey setEncryptionKeySet={setEncryptionKeySet} />
      )}
      <div className="flex justify-between m-3 ">
        <p className="text-3xl font-medium capitalize">{username}</p>
        <button
          className=" rounded-xl h-fit bg-blue-800 text-cyan-50 font-medium  p-2"
          onClick={enableEncryptionMode}
        >
          {" "}
          {encryptMode ? "Encryption Mode" : "Enable Encrypt"}{" "}
        </button>
      </div>

      {encryptMsgView && (
        <ViewEncryptionMsg
          encryptedMsg={msgView}
          setEncryptMsgView={setEncryptMsgView}
          SetStoreKeyAtSession={SetStoreKeyAtSession}
        />
      )}

      <RenderMsg messages={messages} openEncryptedMsg={openEncryptedMsg} />

      {StoreKeyAtSession && (
        <SetkeyAtSession SetStoreKeyAtSession={SetStoreKeyAtSession} />
      )}
      {encryptMode ? (
        // for encryption
        <EncryptionTextInput
          user={user}
          isEncryptionKeySet={isEncryptionKeySet}
          setEncryptionKeySetDiv={setEncryptionKeySetDiv}
          isEncryptionKeySetDiv={isEncryptionKeySetDiv}
          setMessages={setMessages}
          SetStoreKeyAtSession={SetStoreKeyAtSession}
        />
      ) : (
        // normal text
        <NormalTextInput setMessages={setMessages} user={user} />
      )}
    </div>
  );
};

interface RouteParams {
  user: String | "";
}

interface Chat {
  id: Number;
  senderId: Number;
  receiverId: Number;
  content: string;
  timestamp: String;
  encrypt: boolean;
  salt: string | null;
}
interface Msg {
  text: string;
  from: string;
  encrypt: boolean;
  salt: string | null;
}
export default UserChat;
