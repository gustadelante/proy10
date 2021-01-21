import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import ProductList from '../products/ProductList'

const Products = () => {

    // Extraer info de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])


    return ( 
        <div className="contenedor-app">
            
            <div className="seccion-principal">
                <main>

                    <div className="contenedor-products">
                        <ProductList />
                    </div>
                </main>

            </div>

        </div>
    );
}

export default Products;