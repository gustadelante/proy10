
import { FETCH_PRODUCTS, INSERT_PRODUCTS, VALIDAR_FORMULARIO } from "../../types";

export default (state, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
            //console.log("PayloadFetch", action.payload);
            return {
                ...state,
                products: action.payload
            }
        case INSERT_PRODUCTS:
            //console.log("PayloadInsert", action.payload);
            return {
                ...state,
                products: [...state.products, action.payload],
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            //console.log("entra al VALIDAR FORMULARIO")
            return {
                ...state,
                errorformulario: true            

            }
        
        default:
            return state;

    }    
}