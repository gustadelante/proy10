import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/autenticacion/authContext";

const Signin = (props) => {
  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //En caso de q el usuario o password no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push("/newproduct");
    }

    if(mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
  }, [mensaje, autenticado, props.history]);


  // State for init session
  const [user, saveUser] = useState({
    username: "",
    password: "",
  });

  // extraer de usuario
  const { username, password } = user;

  const onChange = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario quiere iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault();

    //valido que los campos estén completos.
    if (username.trim() === "" || password.trim() === "") {
      mostrarAlerta("Complete ambos datos", "alerta-error");
    }

    //Pasarlo al action (funcion definida en el reducer)
    iniciarSesion({ username, password });
    console.log('signin antes de llamar iniciar sesion');
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>
          <div>
            <div className="campo-form">
              {/*<label htmlFor="usuario">Usuario</label> */}
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Tu Usuario"
                value={username}
                onChange={onChange}
              />
            </div>
            <div className="campo-form">
              {/* <label htmlFor="password">Password</label>*/}
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Tu Password"
                value={password}
                onChange={onChange}
              />
            </div>
            {/*
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            */ }
            {/* <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primary"
                value="Iniciar Sesión"
              />
            </div> */}

            <div class="container-fluid h-100">
              <div class="row w-130">
                <div class="col v-center">
                  <button
                    type="submit"                    
                    value="Iniciar Sesión"
                    className="btn btn-primary d-block mx-auto btn-lg"
                  >
                    {" "}
                    Iniciar Sesión{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>




        <Link to={"/signup"} className="enlace-cuenta">
          Obtener cuenta
        </Link>
      </div>
    </div>
  );
};

export default Signin;
