import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {
  // Extraer info de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  //console.log('Barra user', usuario.username);
  
  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          . <span>{usuario.username}</span>
        </p>
      ) : null}

        <nav className="nav-principal">
        <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion() }
                >Cerrar Sesión</button>
        </nav>
    </header>
  );
};

export default Barra;
