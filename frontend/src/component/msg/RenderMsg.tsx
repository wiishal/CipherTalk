export  const RenderMsg: React.FC<props> = ({ messages, openEncryptedMsg }) => {
  return (
    <div className="flex-col h-5/6 p-3 bg-neutral-800 rounded-t-md overflow-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={
            msg.from === "me"
              ? "text-blue-500 my-3 "
              : "text-green-500 my-3 border-b-"
          }
        >
          {msg.encrypt ? (
            <div
              onClick={() => openEncryptedMsg(msg)}
              className="flex align-middle w-fit"
            >
              <p className="py-1 pr-1">
                {msg.from === "me" ? "You: " : `${msg.from}: `}
              </p>
              <div
                className="flex items-center rounded p-1 px-2 w-fit bg-neutral-900 text-neutral-300 text-xs text-center font-medium"
                onClick={() => console.log(msg.text)}
              >
                <p>Encrypt</p>
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
  );
};
interface props {
  messages: Msg[];
  openEncryptedMsg: (msg: Msg) => void;
}
interface Msg {
  text: string;
  from: string;
  encrypt: boolean;
  salt: string | null;
}