import { useState } from "react";
import React from "react";
import Register from "./Register";
import Login from "./Login";

const LoginRegister = () => {
  // difere`cnai entre emprar i no emprar state

  let [login, setLogin] = useState(true);

  
  return (
    <div>
      {login ? <Login setCanvi={setLogin} /> : <Register setCanvi={setLogin} />}
    </div>
  );
}
export default LoginRegister