import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  SIGNIN_EXITOSO,
  SIGNIN_ERROR,
  CERRAR_SESION,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  const [ state, dispatch ] = useReducer(AuthReducer, initialState);
  
  

  const registrarUsuario = async datos => {
      console.log('datos', datos);
      try {
            const respuesta = await clienteAxios.post('/api/auth/signup', datos);
            console.log('respuesta', respuesta.data);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            //Obtener el usuario
            usuarioAutenticado();
            
      } catch (error) {
          //console.log(error.response.data.message);

          const alerta = {
            msg: error.response.data.message,
            categoria: 'alerta-error'
          }
          dispatch({
              type: REGISTRO_ERROR,
              payload: alerta
          })
      }
  }

  // Retornar el usuario autenticado
  const usuarioAutenticado = async ()  => {

    const token = localStorage.getItem('token');
    
    if (token) {
      // TODO: Función para enviar token por headers
      console.log('en usuarioAutenticado', token);
      tokenAuth(token);        
    }
    try {
          const respuesta1 = await clienteAxios.get('/api/auth');
          console.log('respuesta1', respuesta1);
          dispatch({
            type: OBTENER_USUARIO,
            payload: respuesta1.data.usuario
          });
    } catch (error) {
        console.log(error);
        dispatch({
          type: SIGNIN_ERROR
        })
      
    }

  }

  //Cuando el usuario hace login
  const iniciarSesion = async datos => {
    try {
      console.log('Entra al iniciarSesion')
      const respuesta = await clienteAxios.post('/api/auth/signin', datos);      
      
      
      console.log('respuesta datos signin', respuesta.data);     
      
      dispatch({
        type: SIGNIN_EXITOSO,  
         //le pasa el token a signin exitoso        
        payload: respuesta.data
      });
      //Obtener el usuario
      usuarioAutenticado();

    } catch (error) {
      console.log(error.response.data.msg)
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }
      dispatch({
          type: SIGNIN_ERROR,
          payload: alerta
      })  
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        username: state.username,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion
      }}
    >
      {" "}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
