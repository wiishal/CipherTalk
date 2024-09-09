
import { useState } from "react";
import Nav from "./component/Nav";



export default function App() {

  const [isLoggedIn,setIsloggedIn] = useState<boolean | null>(null)

  
  return <div>{isLoggedIn ? <App/> : <></>}</div>;
}
 