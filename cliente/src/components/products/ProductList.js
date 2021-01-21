import React, { useEffect, useContext, useState } from 'react';
import MaterialTable from 'material-table';
import {makeStyles} from '@material-ui/core/styles';
import productContext from "../../context/products/productContext";

import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";


const columnas=[
    {
        title:"OF",
        field:"ofnro",
        type:"numeric"
    },
    {
        title:'BobinaNro',
        field:'bobinanro',            
        type:'numeric'
    },
    {
        title:'Ancho',
        field:'ancho',            
        type:'numeric'
    },
    {
        title:'Diametro',
        field:'diametro',            
        type:'numeric'
    },
    {
        title:'Gramaje',
        field:'gramaje',            
        type:'numeric'
    },
    {
        title:'Peso',
        field:'peso',            
        type:'numeric'
    },
    {
        title:'Turno',
        field:'turno'
    },
    {
        title:'Fecha',
        field:'createdAt'
    }
]

function ProductList() {

    const productsContext = useContext(productContext);
    const { products, fetchProducts } = productsContext; 
    const selectedRow = React.useRef([]);
    
    
    

    const handleClick = rows => {
        selectedRow.current = rows;
        console.log( "selectedRow:" , selectedRow.current);
    };

    useEffect(() => {
        fetchProducts();        
      }, []);
      
    const enviarLote = () => {
        console.log("dentro del Enviar Lote");
        console.log("selectedRow", selectedRow )
        const kilos = 0; 
        
        const seleccion = JSON.stringify(selectedRow.current)
        //const currOfnro = [];
        //const currOfnro = seleccion.ofnro;
        //console.log("seleccion.ofnro", seleccion.ofnro[0]);
        
        let cantKilosLote = 0;
        selectedRow.current.map((seleccion, index)  => {
            //Fijo la primera instancia para luego comparar y definir si los datos son compatibles par el lote
            const ofnroFijo = selectedRow.current[0].ofnro;
            const anchoFijo = selectedRow.current[0].ancho;

            //console.log("ofnroFijo", ofnroFijo);
            //console.log("selectedRow.current[index].ofnro",selectedRow.current[index].ofnro)
            if (ofnroFijo === selectedRow.current[index].ofnro && anchoFijo === selectedRow.current[index].ancho ) {
                //console.log("ofnroFijo",ofnroFijo);
                //console.log("seleccion.current[index].ofnro", seleccion.current[index].ofnro)                
                cantKilosLote = (selectedRow.current[index].peso + cantKilosLote);
                //console.log("seleccion.current[index].peso", selectedRow.current[index].peso)
                //console.log("cantKilosLote", cantKilosLote)
                //console.log(seleccion.peso)
                return (seleccion.peso)
            } 
            
            return null;
            
        })
        
        // seleccion.map((peso, index) => {
        //    kilos = kilos + seleccion.peso;
        //})


        //console.log("kilos", kilos);
        //console.log("seleccionCurr", seleccion);
    };
    
    
    //console.log('productsGG',products)
    //const data=(products)
    //const data=[]
    //console.log('data', data);
    //recorro el array para ver que filas estan seleccionadas
    let filasSeleccionadas = () => {
        return 'Hola'
    };

    console.log(filasSeleccionadas())

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

            <MaterialTable
                columns={columnas}
                data={products}
                title="Producción de Bobinas"                
                options={{
                    paging:true,
                    pageSize:10,       // make initial page size
                    emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
                    pageSizeOptions:[10,20,50],    // rows selection options
                    selection: true,
                    headerStyle: {
                        backgroundColor: "#01579b",
                        color: "#FFF"
                    }                                        
                  }                
                }                
                onSelectionChange = {rows => {
                    handleClick(rows);
                }}
                actions={[
                    {
                      icon: 'enviarLote',
                      tooltip: 'Enviar Lote',
                      //onClick: (event, rowData) => alert("You saved " + rowData.ofnro)
                      onClick: (event, rowData) => console.log(enviarLote())
                      
                    }
                  ]}
                  components={{
                    Action: props => (
                      <Button
                        onClick={(event) => props.action.onClick(event, props.data)}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                        size="large"
                      >
                        Enviar Lote
                      </Button>
                    ),
                  }}
                                
                /* actions={[
                    {
                        icon: () => <EditIcon/>,
                        tooltip: 'Editar Producto',
                        onClick: (event, rowData)=>alert('Editando Producto nro: '+rowData.bobinanro)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => ("You want to delete " + rowData.bobinanro)
                    }
                ]}  */
                /* components={{
                    Action: props => (
                        <Button
                            onClick={event => props.action.onClick(event, props.data)}                
                            color="primary" 
                            variant="text"
                            style={{ textTransform: "none" }}
                            size="small" >
                                EnviarLote
                        </Button>
                    )
                }} */                
            />
        </div>
    );

}
/* components={{
                    Action: props => (
                        <Button
                            onClick={event => props.action.onClick(event, props.data)}                
                            color="primary" 
                            variant="text"
                            style={{ textTransform: "none" }}
                            size="small" >
                                Editar
                        </Button>
                    )
                }} */

export default ProductList;