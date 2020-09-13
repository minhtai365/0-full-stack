import React, { Component } from 'react';
import './App.css';
import Login from './component/Login';
import Register from './component/Regester';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Forgot from './component/Forgot';
import Header from './component/Header';
import Footer from './component/Footer';
import Carousel from './component/Carousel';
import Boxicon from './component/Boxicon';
import Detail from './component/Detail';
import Main from './component/Main';
import Cart from './component/Cart';
import Admin from './component/Admin';
// import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'Tài khoản'
    }
    
  }
  
  loaduser=(user)=>{
    console.log(user);
    this.setState({
      name:user
    })
  }
  render(){
    // console.log(this.state.dt);
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login.html" exact>
          <Login senduser={user=>this.loaduser(user)} />
            </Route>
          <Route path="/register.html" exact component={Register} />
          <Route path="/forgot.html" exact component={Forgot} />
          <Route path="/index.html" exact>
            <Header name={this.state.name} />
            <Carousel />
            <hr/>
            <Boxicon />
            <Main />
            <Footer />
          </Route>
          <Route path="/detail.html" exact>
            <Header name={this.state.name} />
            <Detail />
            <Footer />
          </Route>
          <Route path="/cart.html" exact>
            <Header name={this.state.name} />
            <Cart />
            <hr/>
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
