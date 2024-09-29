import { useParams } from "react-router-dom";

interface RouteParams {
  user: String | "";
}
const UserChat: React.FC = () => {
  const { user } = useParams<keyof RouteParams>();

  return (
    <div className="size-full bg-gray-950 text-white">userChat {user}</div>
  );
};

export default UserChat;
