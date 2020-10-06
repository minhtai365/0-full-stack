import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './component/FormLogin/Login';
import Register from './component/FormLogin/Regester';
import Forgot from './component/FormLogin/Forgot';
import Detail from './component/content/Detail';
import Main from './component/content/Main';
import Cart from './component/content/Cart';
import Properties from './component/content/Properties';
import InfoAdmin from './component/Admin/InfoAdmin';
import ContentAccount from './component/Admin/ContentAccount';
import ContentTypes from './component/Admin/ContentTypes';
import ContentCatelogys from './component/Admin/ContentCatelogys';
import ContentProducts from './component/Admin/ContentProducts';
import ContentOrder from './component/Admin/ContentOrder';
import Order from './component/content/Order';
class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login.html" exact>
              <Login />
            </Route>
            <Route path="/register.html" exact component={Register} />
            <Route path="/forgot.html" exact component={Forgot} />
            <Route path="/properties.html" exact component={Properties} />
            <Route path="/chi-tiet/:slug/:id.html" exact component={Detail} />
            <Route path="/index" component={Main}/>
            <Route path="/cart.html" exact component={Cart}/>
            <Route path="/u/order.html" exact component={Order}/>
            <Route path="/admin.html" exact component={InfoAdmin} />
            <Route path="/account.html" exact component={ContentAccount} />
            <Route path="/types.html">
              <ContentTypes />
            </Route>
            <Route path="/catelogys.html">
              <ContentCatelogys />
            </Route>
            <Route path="/products.html">
              <ContentProducts />
            </Route>
            <Route path="/orders.html">
              <ContentOrder />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
