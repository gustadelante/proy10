import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Products from "./components/products/Products";
import NewProductForm from "./components/products/NewProductForm";
import Navbar from "./components/Navbar/Navbar";
import Barra from "./components/layout/Barra";
import AlertState from "./context/alerts/alertState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";
import RutaPrivada from "./components/rutas/RutaPrivada";
import ProductState from "./context/products/productState";

// Ver si existe un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  //console.log(process.env.REACT_APP_BACKEND_URL);
    return ( 
      <ProductState>
        <AlertState>
          <AuthState>
            <Router>
            <Navbar />
              <Switch>
              <Route exact path="/" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/products" component={Products} />
                <RutaPrivada
                  exact
                  path="/newproduct"
                  component={NewProductForm}
                />  
              </Switch>
            </Router>  
          </AuthState>
        </AlertState>
      </ProductState>
    );
  /* return (  
    <AlertState>
      <AuthState>
        <ProductState>
          <Router>
            <Navbar />

            <div className="container p-4">
              <Switch>
                <Route exact path="/" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/products" component={Products} />
                <RutaPrivada
                  exact
                  path="/newproduct"
                  component={NewProductForm}
                />
              </Switch>
            </div>
          </Router>
        </ProductState>
      </AuthState>
    </AlertState>
  ); */
}

export default App;
