import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from "./UserContext";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop"
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";
import Error from "./pages/Error";

function App() {
  const [user, setUser] = useState({
    id: null,
    email: null,
    is_admin: null
  });

  const unsetUser = () => localStorage.clear();

  useEffect(() => {
    if(localStorage.getItem("token") !== null){
      fetch("http://localhost:5000/api/users/details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setUser({
          id: data.id,
          email: data.email,
          is_admin: data.is_admin
        });
      });
    }
  }, [user]);
  
  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/shop" component={Shop}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/logout" component={Logout}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/product/:id" component={Product}/>
          <Route exact path="/myorders" component={MyOrders}/>
          <Route exact path="/cart" component={Cart}/>
          <Route component={Error}/>
        </Switch>
        <Footer/>
      </Router>
    </UserProvider>

  );
}

export default App;
