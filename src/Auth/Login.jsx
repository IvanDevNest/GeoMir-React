import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useForm } from '../Hooks/useForm';


export default function Login({ setCanvi }) {

  let { authToken, setAuthToken } = useContext(UserContext);
      let [error, setError] = useState("");
      const { formState, onInputChange } = useForm({

        email: "",
        
        password: "",
        
        });
        
        const {email,password} = formState 
      


    const sendLogin = async (e) => {
      e.preventDefault();
    
      // Enviam dades a l'aPI i recollim resultat
      try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ email, password })
        });
  
  
        const resposta = await data.json();
        if (resposta.success === true)       setAuthToken(resposta.authToken) ;
        else alert("La resposta no ha triomfat");
  
  
        alert("He enviat les Dades:  " + email + "/" + password);
      } catch {
        console.log("Error");
        alert("catch");
      }
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

