import { useParams } from "react-router-dom";

interface RouteParams {
  user: String | "";
}
const UserChat: React.FC = () => {
  const { user } = useParams<keyof RouteParams>();

  return <div>userChat {user}</div>;
};

export default UserChat;
