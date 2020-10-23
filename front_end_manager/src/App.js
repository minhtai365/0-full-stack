import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './component/FormLogin/Login';
import Register from './component/FormLogin/Regester';
import Forgot from './component/FormLogin/Forgot';
import Detail from './component/content/Detail';
import Main from './component/content/Main';
import Cart from './component/content/Cart';
import Properties from './component/content/Properties';
import Order from './component/content/Order';
import Footer from './component/layout/Footer';
import Header from './component/layout/Header';
import Admin from './component/Admin/Admin';
// import Donhang from './component/Admin/Donhang';
class App extends Component {

  render() {
    return (
      <Router>
        <div>
          
        <Header/>
          <Switch>
            
            <Route path="/" exact>
              <Redirect to="/index" />
            </Route>
            <Route path="/login.html" exact>
              <Login />
            </Route>
            <Route path="/register.html" exact component={Register} />
            <Route path="/forgot.html" exact component={Forgot} />
            <Route path="/properties.html" exact component={Properties} />
            <Route path="/chi-tiet/:slug/:id.html" exact component={Detail} />
            <Route path="/index" component={Main} />
            <Route path="/cart.html" exact component={Cart} />
            <Route path="/u/order" exact component={Order} />

           
          </Switch>
          
          <Footer/>
          
          <Route path="/admin" component={Admin} />
        </div>
      </Router>
    );
  }
}
export default App;
