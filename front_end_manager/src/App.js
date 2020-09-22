import React, { Component } from 'react';
import './App.css';
import Login from './component/Login';
import Register from './component/Regester';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Forgot from './component/Forgot';
import Header from './component/Header';
import Footer from './component/Footer';
// import Carousel from './component/Carousel';
import Boxicon from './component/Boxicon';
import Detail from './component/Detail';
import Main from './component/Main';
import Cart from './component/Cart';
import Admin from './component/Admin';
// import Axios from 'axios';
// import Model from 'react-modal';
// Model.setAppElement("#modal");
class App extends Component {
 
  render() {
    // console.log(this.state.dt);
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login.html" exact>
              <Login />
            </Route>
            <Route path="/register.html" exact component={Register} />
            <Route path="/forgot.html" exact component={Forgot} />
            <Route path="/chi-tiet/:slug/:id.html" exact component={Detail} />
            <Route path="/index">
                <Main />
            </Route>
            
            <Route path="/cart.html" exact>
              <Header/>
              <Cart />
              <hr />
              <Boxicon />
              <Footer />
            </Route>

            <Route path="/admin.html" exact component={Admin} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
