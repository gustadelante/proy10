import React, { Fragment, useContext, useEffect } from 'react';
import Product from './Product';
import productContext from '../../context/products/productContext';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Datatable, { createTheme } from 'react-data-table-component'

createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });

const ProductList = () => {
    
    // Extraer proyectos de state inicial
    const productsContext = useContext(productContext);
    const { products, fetchProducts } = productsContext;

    // LLama al fetchProducts ni bien carga el componente
    // [] (se le pasa un arreglo vacio)se usa para que se ejecute una vez
    useEffect(() => {
        fetchProducts();
    }, []);

    
    // Revisar si products tiene contenido
    if(products.length === 0 ) return <p>No Hay Productos</p>;

    const columns = [
        {
            name: 'OF',
            selector: "ofnro",
            sortable: true,
            type: "numeric",
            right: true

        },
        {
            name: 'bobinaNro',
            selector: 'bobinanro',
            sortable: true,
            type: "numeric",
            right: true
        },
        {
            name: 'Ancho',
            selector: 'ancho',
            sortable: true,
            type: "numeric",
            right: true
        },
        {
            name: 'Diametro',
            selector: 'diametro',
            sortable: true,
            type: "numeric",
            right: true
        },{
            name: 'Gramaje',
            selector: 'gramaje',
            sortable: true,
            type: "numeric",
            right: true
        },
        {
            name: 'Peso',
            selector: 'peso',
            sortable: true,
            type: "numeric",
            right: true
        },
        {
            name: 'Turno',
            selector: 'turno',
            sortable: true,
            type: "numeric"
        },
        {
            name: 'Fecha',
            selector: 'createdAt',
            sortable: true
        },
    ]    
    
    //console.log('products', products)
    

    const paginationOptions= {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'        
    }

    return ( 
        // <Fragment>
        <div className="table-responsive">
            <Datatable 
            columns={columns}
            data={products}
            //data={data1}
            title={"Producción de Bobinas"}
            pagination
            highlightOnHover
            theme="solarized"
            paginationComponentOptions={paginationOptions}              
            fixedHeader
            fixedHeaderScrollHeight="600px"

            />    
            
        </div>    
            
            /* <ul className="listado-proyectos">
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}                        
                    />    
                ))}
            </ul> */
        // </Fragment>
    );
}

export default ProductList;
