import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../sevices/authentication";


const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);

  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {

    const token = await login(data.name,data.password)
    if(!token){
      alert("error");
      return;
    }
    localStorage.setItem("userToken", token);
    setIsLoggedIn(true);
  };

  return (
    <div className=" size-full flex justify-center items-center text-white">
      <form
        className=" h-2.5/4 w-2/4 rounded p-4 flex flex-col flex-wrap space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username" className="font-semibold text-lg text-white">
          Username
        </label>
        <input
          id="username"
          placeholder="Enter username"
          className="w-64 border border-sky-500 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          {...register("name", { required: true })}
        />

        <label htmlFor="email" className="font-semibold text-lg text-white">
          Password
        </label>
        <div>
          <input
            id="password"
            type={passwordVisibility ? "password" : ""}
            placeholder="Enter Password"
            className="ml-1 w-48 border text-gray-700 border-sky-500 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            {...register("password", { required: true })}
          />{" "}
          <button
            type="button"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >
            {passwordVisibility ? "Show" : "Hide"}
          </button>
        </div>

        <button
          type="submit"
          className="w-20 bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 transition-colors"
        >
          Submit
        </button>
        <Link to="/SignUp"> Creat Account</Link>
      </form>
    </div>
  );
};

interface FormValues {
  name: string;

  password: string;
}
interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}



export default Login;
