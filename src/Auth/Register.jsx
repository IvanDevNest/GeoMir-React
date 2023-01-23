import React from 'react'
import { useState } from 'react';

export default function Register({setCanvi}) {
  let [formulari, setFormulari] = useState({});
  let [error, setError] = useState("");


  const handleChange = (e) => {
    e.preventDefault();

    setFormulari({
      ...formulari,
      [e.target.name]: e.target.value
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();

    let { name, password, password2, email } = formulari;
    alert(
      "He enviat les Dades:  " +
      name +
      "/" +
      email +
      "/" +
      password +
      "/" +
      password2
    );


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
          <input name="name" type="text" class="form-control" placeholder="Username " id="UserName" onChange={handleChange} />
        </div>
        <div class="form-group ">
          <input name="email" type="text" class="form-control" placeholder="Email " id="Email" onChange={handleChange} />
        </div>
        <div class="form-group log-status">
          <input name="password" type="password" class="form-control" placeholder="Password" id="Passwod" onChange={handleChange} />
        </div>

        <div class="form-group log-status">
          <input name="password2" type="password" class="form-control" placeholder="Password" id="Passwod2" onChange={handleChange} />

        </div>
        <button
          onClick={(e) => {
            handleRegister(e);
          }}
        >
          Crea la conta       </button>
          {error ? <div>{error}</div> : <></>}


        <button
          onClick={() => {
            setCanvi(true);
          }}
        >
          Ja estas registrat?
        </button>

      </div>
    </>
  );
}