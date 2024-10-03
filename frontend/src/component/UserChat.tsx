import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface RouteParams {
  user: String | "";
}
const UserChat: React.FC = () => {
  const [message,setMessage] = useState<string>("")
  const [username, setUsername] = useState<string>()
  const url = "http://localhost:3000";
  const { user } = useParams<keyof RouteParams>();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios.post(`${url}/Friend/verify`,{
        usertoken: token,
        userid: user,
      }).then((res)=>{
        console.log(res.status,res.data.userFind.userName)
        setUsername(res.data.userFind.username);
      });
  }, []);

  return (
    <div className="size-full bg-gray-950 text-white">
      <h2>{username}</h2>
     
      <input type="text" />
    </div>
  );
};

export default UserChat;
