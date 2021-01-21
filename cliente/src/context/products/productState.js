import React, { useReducer, useContext } from "react";
import { v4 as uuid } from "uuid";

import productContext from "./productContext";
import productReducer from "./productReducer";
import {
  FETCH_PRODUCTS,
  INSERT_PRODUCTS,
  VALIDAR_FORMULARIO,
} from "../../types";
import clienteAxios from '../../config/axios';


const ProductState = (props) => {
  /* const products = [
    { id: 1, ofnro: 5654523, estado: true },
    { id: 2, ofnro: 5654533, estado: false },
    { id: 3, ofnro: 5654442, estado: true },
    { id: 4, ofnro: 5654532, estado: true },
    { id: 5, ofnro: 5654523, estado: true },
  ]; */

  const initialState = {
    products: [],
    newForm: false,
    errorformulario: false
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Funciones para CRUD de products

  // Obtener los productos
  const fetchProducts = async () => {
    try {
        const resultado = await clienteAxios.get('/api/products');
        dispatch({
            type: FETCH_PRODUCTS,
            payload: resultado.data,
          });
    } catch (error) {
        console.log(error);
    }
  };

  // Agregar nuevo producto
  

  const insertProduct = async (product) => {
    //product.id = uuid.v4();
    //const token = localStorage.getItem('token');
    //console.log('product', product);
    //console.log('token', token);
    
    try {
        //let data = JSON.stringify(product)
        //console.log("data", data);        
        //const resultado = await clienteAxios.post('/api/products', product);
        //let axiosConfig = {
        //    headers: {
        //        'Content-Type': 'application/json', 'token': token,
        //   }
        //};
        //console.log('axiosconfig', axiosConfig);
        //const resultado = await clienteAxios.post('/api/products', product, axiosConfig);
        //const resultado = await clienteAxios.post('/api/products', data, axiosConfig);
        const resultado = await clienteAxios.post('/api/products', product);
        console.log('res', resultado);
        //Insertar product en el state
        dispatch({
            type: INSERT_PRODUCTS,
            payload: resultado.data
        });

    } catch (error) {
        console.log('sale por error')
        console.log(error);
    }
    
    

  };

  // Valida el formulario por errores
  const mostrarError = () => {
      dispatch({
          type: VALIDAR_FORMULARIO          
      })
  }

  return (
    <productContext.Provider
      value={{
        products: state.products,
        form: state.form,
        errorformulario: state.errorformulario,
        fetchProducts,
        insertProduct,
        mostrarError
      }}
    >
      {props.children}
    </productContext.Provider>
  );
};

export default ProductState;
