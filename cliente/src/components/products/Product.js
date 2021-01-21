import React from 'react';


const Product = ({product}) => {
    return ( 
        <li className="tarea sombra">
            {/* <button
                type="button"
                className="btn btn-blank"
            >{product.ofnro}</button> */}
            <p> {product.ofnro} </p>

            <div className="estado">
                {product.estado 
                ? (
                    <button 
                        type="button"
                        className="completo">
                    EnStock</button>
                  )
                : (
                    <button 
                        type="button"
                        className="incompleto">
                    NoStock</button>
                  )

                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario">
                    Eliminar
                </button>
            </div>
        </li>

    );
}

export default Product;