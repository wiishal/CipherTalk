
import { useEffect, useState } from "react";
import Login from "./auth/Login";



export default function App() {

   const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(()=>{
    console.log("working")
   const usertoken =  localStorage.getItem('userToken')
   console.log(usertoken)
   if(usertoken){
    setIsLoggedIn(true);
   }else{

     setIsLoggedIn(false);
   }
  },[])
    if (isLoggedIn === null) {
    
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen">
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} /> // Correct capitalization passed as prop
      ) : (
        <h1>Welcome back!</h1>
      )}
    </div>
  ); 

}