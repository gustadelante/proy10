import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Products from "./components/products/Products";
import NewProductForm from "./components/products/NewProductForm";
import Navbar from "./components/Navbar/Navbar";
import Barra from "./components/layout/Barra";
import AlertState from "./context/alerts/alertState";
import AuthState from './context/autenticacion/authState'

function App() {

  //console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    <AlertState>
      <AuthState>
        <Router>
          <Barra />
          <Navbar />

          <div className="container p-4">
            <Switch>
              <Route exact path="/" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/newproduct" component={NewProductForm} />
            </Switch>
          </div>
        </Router>
        </AuthState>
    </AlertState>
  );
}

export default App;
