import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
// import { useForm } from '../hooks/useForm';
import { useForm } from "react-hook-form";


export default function Register({ setLogin }) {
  let [formulari, setFormulari] = useState({});
  let [error, setError] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);
  const onSubmit = data => handleRegister(data)
  const { register, handleSubmit, formState: { errors } } = useForm()
  // const { formState, onInputChange } = useForm({

  //   name: "",

  //   email: "",

  //   password: "",

  //   password2: "",


  //   });
  //   const {name,email,password,password2  } = formState

  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   //let { name, password, password2, email } = formState;
  //   alert(
  //     "He enviat les Dades:  " +
  //     name +
  //     "/" +
  //     email +
  //     "/" +
  //     password +
  //     "/" +
  //     password2
  //   );
  const handleRegister = async (formState) => {
    let { name, password, password2, email } = formState;


    if (password2 !== password) {
      setError("Els passwords han de coincidir");
      return false;
    }


    fetch("https://backend.insjoaquimmir.cat/api/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      // Si els noms i les variables coincideix, podem simplificar
      body: JSON.stringify({ name, email, password })
    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
          alert(resposta.authToken);
          setAuthToken(resposta.authToken)
        }
        else {
          setError(resposta.message);
          console.log(resposta)
        }
      })

      .catch((data) => {
        console.log(data);
        alert("Catchch");
      });

    alert("He enviat les Dades:  " + email + "/" + password);
  };

  return (
    <>
      <div class="login-form">
        <h1>Register</h1>
        <div class="form-group ">
          <input {...register("name", { required: true, maxLength: 20 })}
            // name="name"
            type="text" class="form-control" placeholder="Username " id="UserName"
          //  onChange={onInputChange} 
          />
        </div>
        <div class="form-group ">
          <input {...register("email")}
            //name="email" 
            type="text" class="form-control" placeholder="Email " id="Email"
          // onChange={onInputChange}
          />
        </div>
        <div class="form-group log-status">
          <input  {...register("password", {

            required: "Aquest camp és obligatori",

            minLength: {

              value: 8,

              message: "La contrasenya ha de tenir al menys 8 caràcters"

            },

            maxLength: {

              value: 20,

              message: "La contrasenya ha de tenir com a màxim 20 caràcters"

            },

            pattern: {

              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,

              message:

                "La contrasenya ha de contenir al menys una minúscula, una majúscula, i un número"

            }

          })}
            //name="password" type="password" class="form-control" placeholder="Password" id="Passwod"
            // onChange={onInputChange} 
            />
                      {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div class="form-group log-status">
          <input {...register("password2")}
          //name="password2" type="password" class="form-control" placeholder="Password" id="Passwod2"
          // onChange={onInputChange}
          />

        </div>
        <button
          onClick={handleSubmit(onSubmit)}
        >
          Crea la conta       </button>
        {error ? <div>{error}</div> : <></>}


        <button
          onClick={() => {
            setLogin(true);
          }}
        >
          Ja estas registrat?
        </button>

      </div>
    </>
  );
}