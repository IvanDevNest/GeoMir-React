import { useState } from "react";
import React from "react";
import Register from "./Register";
import Login from "./Login";

const LoginRegister = () => {
  // difere`cnai entre emprar i no emprar state

  let [login, setLogin] = useState(true);

  
  return (
    <div>
      <Login />
    </div>
  );
}
export default LoginRegister