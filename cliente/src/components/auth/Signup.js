import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/autenticacion/authContext";

const Signup = (props) => {
  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //En caso de q el usuario se haya autenticado o registrado o sea un registro duplicado
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
    email: "",
    password: "",
    confirmar: "",
  });

  // extraer de usuario
  const { username, email, password, confirmar } = user;

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
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //validar que tenga 6 caracteres minímo.
    if (password.length < 6) {
      mostrarAlerta(
        "La password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //valido que coincidan password-confirma
    if (password !== confirmar) {
      mostrarAlerta("Los password no coinciden", "alerta-error");
      return;
    }
    //Pasarlo al action (funcion definida en el reducer)
    registrarUsuario({
      username,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear Cuenta</h1>

        <form onSubmit={onSubmit}>
          <div>
            <div className="campo-form">
              <label htmlFor="usuario">Usuario</label>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="campo-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Tu Password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="confirmar"> Confirmar Password</label>
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                placeholder="Repite tu Password"
                value={confirmar}
                onChange={onChange}
              />
            </div>

            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Registrar"
              />
            </div>
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Signup;
