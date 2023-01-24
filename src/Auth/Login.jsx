import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";


export default function Login({ setCanvi }) {

  let [email, setEmail] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);
  let [password, setPassword] = useState("");
    let [error, setError] = useState("");


  const sendLogin = (e) => {
    e.preventDefault();
    fetch("https://backend.insjoaquimmir.cat/api/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ email: email, password: password })
    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
          setAuthToken(resposta.authToken);


        }
        else {
          setError(resposta.message)
        }
      })
      .catch((data) => {
        console.log(data);
        alert("Catchch");
      });

  };







  return (
    <>

      <div class="login-form">
        <h1>Login</h1>

          <i class="fa fa-user"></i>
          <div class="form-group ">
            <input name="email" type="text" class="form-control" placeholder="Email " id="UserName" onChange={(e) => {
              setEmail(e.target.value);
            }} />
          </div>

        <div class="form-group log-status">
          <input name="password" type="password" class="form-control" placeholder="Password" id="Password" onChange={(e) => {
            setPassword(e.target.value);
          }} />
          <i class="fa fa-lock"></i>
        </div>

        <button
          onClick={(e) => {
            sendLogin(e);
          }}
        >
          Login      </button>
        {error ? <div>{error}</div> : <></>}

        <br></br><button
          onClick={() => {
            setCanvi(false);
          }}
          type="button" class="log-btn" >
          Crea una conta
        </button>

      </div>
    </>
  );
}

