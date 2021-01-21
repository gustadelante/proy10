import React, { Fragment, useState, useContext } from "react";
import Barra from "../layout/Barra";
import productContext from "../../context/products/productContext";

const NewProduct = () => {
  // Obtener el state del formulario principal- Esto es para mostrar o no el form de alta
  // productsContext es un hook
  const productsContext = useContext(productContext);
  //const { newForm, insertProduct } = productsContext;
  const { errorformulario, insertProduct, mostrarError } = productsContext;

  //puedo comparar newForm con un ternario si es true muestro el form sino null

  //State form productos
  const [product, saveProduct] = useState({
    "ancho": "",
    "diametro": "",
    "gramaje": "",
    "peso": "",
    "bobinanro": "",
    "ofnro": "",
    "fecha": "",
    "turno": "",
  });

  //Extraer valores ingresados por el usuario
  const {
    ancho,
    diametro,
    gramaje,
    peso,
    bobinanro,
    ofnro,
    fecha,
    turno,
  } = product; 
      

  //Lee los datos ingresados x el usuario
  const onChangeProduct = (e) => {
    saveProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  //Cuando el usuario presiona imprimir(submit)
  const onSubmitProduct = (e) => {
    e.preventDefault();

    //validar product
    /* ancho:"",
    diametro:"",
    gramaje:"",
    peso:"",
    bobinanro: "",
    of:"",
    fecha:"",
    turno:""*/
    if (ancho === "") {
      console.log("ancho en blanco", ancho);
      console.log("errorformulario", errorformulario);
      mostrarError();
      return;
    }

    //agregar al state (persistencia)
    insertProduct(product);

    //Reinicializar el form

    saveProduct({
      "ancho": "",
      "diametro": "",
      "gramaje": "",
      "peso": "",
      "bobinanro": "",
      "ofnro": "",
      "fecha": "",
      "turno": "",
    });
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <form onSubmit={onSubmitProduct}>
            <div className="form-group row">
              <div className="col-sm-6">
                <label for="ancho">Ancho</label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="ancho"
                  placeholder="Ancho"
                  value={ancho}
                  onChange={onChangeProduct}
                />
              </div>
              <div className="col-sm-6">
                <label for="diametro">Diametro</label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="diametro"
                  placeholder="Diametro"
                  value={diametro}
                  onChange={onChangeProduct}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <label for="gramaje">Gramaje</label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="gramaje"
                  placeholder="Gramaje"
                  value={gramaje}
                  onChange={onChangeProduct}
                />
              </div>
              <div className="col-sm-6">
                <label for="peso">Peso</label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="peso"
                  placeholder="Peso"
                  value={peso}
                  onChange={onChangeProduct}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <label for="bobinanro">Bobina Nro.</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="bobinanro"
                  placeholder="Número de Bobina"
                  value={bobinanro}
                  onChange={onChangeProduct}
                />
              </div>
              <div className="col-sm-6">
                <label for="of">Orden de Fabricación</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="ofnro"
                  placeholder="Número de OF"
                  value={ofnro}
                  onChange={onChangeProduct}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <label for="fecha">Fecha</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  id="fecha"
                  placeholder="Fecha"
                  value={fecha}
                  onChange={onChangeProduct}
                />
              </div>
              <div className="col-sm-6">
                <label for="turno">Turno</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="turno"
                  placeholder="Turno"
                  value={turno}
                  onChange={onChangeProduct}
                />
              </div>
            </div>

            {/* <button type="button" className="btn btn-primary px-4 float-right">
              Imprimir
            </button> */}
            <input
              type="submit"
              className="btn btn-primary btn-block px-4 float-right"
              value="Imprimir"
            />
          </form>
          {errorformulario ? (
            <p className="mensaje error">Todos los campos son obligatorios</p>
          ) : null}
        </div>
      </div>
    </div>

    /*{   <Fragment>
      
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="card">
              <div className="car-body">
                <h3>Nuevo Producto</h3>
                <div className="form-group">
                  <label for="Ancho">Ancho</label>
                  <input
                    type="number"
                    name="ancho"
                    placeholder="Ancho"
                    className="form-control form-control-lg"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="diametro"
                    placeholder="Diametro"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </Fragment> }*/

    /*{ <Fragment>
      {      
       <button type="button" className="btn btn-block btn-primario">
        Nuevo Producto
      </button>
      <form className="formulario-nuevo-proyecto"></form> }
    </Fragment> }*/
  );
};

export default NewProduct;
