import React, { Fragment, useState } from "react";

const NewProduct = () => {
  //State form productos
  const [product, saveProduct] = useState({
    ancho:"",
    diametro:"",
    gramaje:"",
    peso:"",
    bobinanro: "",
    of:"",
    fecha:"",
    turno:""
  });

  //Lee los datos ingresados x el usuario
  const onChangeProduct = (e) => {
    saveProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  //Cuando el usuario presiona imprimir(submit)
  const onSubmitProduct = e => {
      e.preventDefault();

      //validar product

      //agregar al state (persistencia)

      //Reinicializar el form

  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <form onSubmit={onSubmitProduct}  >
            <div className="form-group row">
              <div className="col-sm-6">
                <label for="ancho">Ancho</label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="ancho"
                  placeholder="Ancho"                  
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
                  onChange={onChangeProduct}
                />
              </div>
              <div className="col-sm-6">
                <label for="of">Orden de Fabricación</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="of"
                  placeholder="Número de OF"
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
                  onChange={onChangeProduct}
                />
              </div>
            </div>
            <button type="button" className="btn btn-primary px-4 float-right">
              Imprimir
            </button>
          </form>
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
