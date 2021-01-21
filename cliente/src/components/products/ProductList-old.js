import React, { Fragment, useContext, useEffect, useState } from "react";
import Product from "./Product";
import productContext from "../../context/products/productContext";
import Datatable, { createTheme } from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

createTheme("solarized", {
  text: {
    primary: "#268bd2",
    secondary: "#2aa198",
  },
  background: {
    default: "#002b36",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
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

  const [busqueda, saveBusqueda] = useState({
        "campobusqueda": "",
        "ancho": "",
        "diametro": "",
        "gramaje": "",
        "peso": "",
        "bobinanro": "",
        "ofnro": "",
        "fecha": "",
        "turno": "", 
  });
 //Extrae valores ingresados por usuario
  const { 
    campobusqueda,
    ancho,
    diametro,
    gramaje,
    peso,
    bobinanro,
    ofnro,
    fecha,
    turno, } = busqueda;

    
  //Lee los datos ingresados x el usuario
  const onChangeBusqueda = async (e) => {
    console.log("onchangeBusqueda", campobusqueda);
    console.log("targetvalue",e.target.value)
    /* saveBusqueda({
    ...busqueda,
    [e.target.id]: e.target.value,
      
    });  */
    busqueda.campobusqueda = e.target.value;
    console.log('CampoBusqueda', busqueda.campobusqueda);
    
    //await this.setState({busqueda: e.target.value});
    await filtrarElementos({busqueda: e.target.value});
    /* filtrarElementos({
        busqueda: e.target.value
    }) */

    
  };

  //fakeUsers.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));  
  /* const filtrarElementos=()=>{
    console.log("campobusqueda en filtrarElem", campobusqueda)
    var search=products.filter(item=>{item.ofnro && item.bobinanro}
        ) {return item; };
    this.setState({products: search});
  };
 */
  let contador = 0;

  const filtrarElementos=()=>{
    console.log('busqueda.campobusqueda', busqueda.campobusqueda);    
    var search=products.filter(item=>{
      console.log('contador', contador);
      contador = contador +1;
      console.log('itemofnroDentroVar search', item.ofnro);
      console.log('item', item);
      //if(item.ofnro == busqueda.campobusqueda || item.bobinanro == busqueda.campobusqueda
      console.log('parseItemBobinanro', parseInt(item.bobinanro));
      console.log('parseIntcampobusqueda', busqueda.campobusqueda);
      //if(item.bobinanro.toString().includes(busqueda.campobusqueda) > parseInt(busqueda.campobusqueda)
      let bobina = parseInt(item.bobinanro);
      console.log("inclusion", (bobina.toString().includes(busqueda.campobusqueda)));
      if(bobina.toString().includes(busqueda.campobusqueda)     
      ){
        console.log('itemofnroDENTROIF1', item.bobinanro);
        console.log("item DENTRO IF2",item);
        return item;
      }
    });
    console.log("search", search);
    console.log("Sale sin retornar items");
    //this.setState({products: search});
  } 


  // Revisar si products tiene contenido
  if (products.length === 0) return <p>No Hay Productos</p>;

  const columns = [
    {
      name: "OF",
      selector: "ofnro",
      sortable: true,
      type: "numeric",
      right: true,
    },
    {
      name: "bobinaNro",
      selector: "bobinanro",
      sortable: true,
      type: "numeric",
      right: true,
    },
    {
      name: "Ancho",
      selector: "ancho",
      sortable: true,
      type: "numeric",
      right: true,
    },
    {
      name: "Diametro",
      selector: "diametro",
      sortable: true,
      type: "numeric",
      right: true,
    },
    {
      name: "Gramaje",
      selector: "gramaje",
      sortable: true,
      type: "numeric",
      right: true,
    },
    {
      name: "Peso",
      selector: "peso",
      sortable: true,
      type: "numeric",
      right: true,
    },
    {
      name: "Turno",
      selector: "turno",
      sortable: true,
      type: "numeric",
    },
    {
      name: "Fecha",
      selector: "createdAt",
      sortable: true,
    },
  ];

  //console.log('products', products)

  const paginationOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    // <Fragment>
    <div className="table-responsive">
      <div className="barraBusqueda">
        <input
          type="number"
          placeholder="Buscar por OF/Nro Bobina"
          className="textField"
          id="busqueda"
          value={campobusqueda}
          onChange={onChangeBusqueda}
        />
        <button type="button" className="btnBuscar" /*onClick={onClear}*/>
          {" "}
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
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
};

export default ProductList;
