import {REGISTRO_EXITOSO,
        REGISTRO_ERROR,
        OBTENER_USUARIO,
        SIGNIN_EXITOSO,
        SIGNIN_ERROR,
        CERRAR_SESION} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null
            }
        case SIGNIN_EXITOSO:
            console.log('signin exitoso AuthRed', action.payload.token);
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null
            }       
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload
            }
        case CERRAR_SESION:
            localStorage.removeItem('token')
            //console.log("entra al CERRAR_SESION")
            return {
                ...state,
                token: null,
                autenticado: null,
                usuario: null,
                mensaje: action.payload
            }
        case SIGNIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                mensaje: action.payload
            }

        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                mensaje: action.payload
            }
        
        default:
            return state;
    }
}