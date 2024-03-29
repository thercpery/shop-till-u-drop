import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from "./UserContext";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [user, setUser] = useState({
    id: null,
    email: null,
    is_admin: null
  });

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      id: null,
      email: null,
      is_admin: null
    });
  };

  useEffect(() => {
    fetch(`${ process.env.REACT_APP_API_URL }/api/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(typeof data.id !== "undefined") {
        setUser({
          id: data.id,
          email: data.email,
          is_admin: data.is_admin
        });
      }
      else{
        setUser({
          id: null,
          email: null,
          is_admin: null
        });
      }
    });
  }, [user, localStorage.getItem("token")]);
  
  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/product/:id" component={Product}/>
          <Route exact path="/products" component={Products}/>
          <Route exact path="/orders" component={Orders}/>
          <Route exact path="/cart" component={Cart}/>
          <Route exact path="/change-password" component={ChangePassword} />
          <Route component={Error}/>
        </Switch>
        <Footer/>
      </Router>
    </UserProvider>

  );
}

export default App;
