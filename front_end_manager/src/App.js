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
// import Axios from 'axios';

class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state={
//       dt:null
//     }
//   }
//   componentWillMount(){
//     Axios.get('/product').then(res=> {
//         this.setState({
//             dt: res.data
//         })
//     })
// }
  render(){
    // console.log(this.state.dt);
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login.html" exact component={Login} />
          <Route path="/register.html" exact component={Register} />
          <Route path="/forgot.html" exact component={Forgot} />
          <Route path="/index.html" exact>
            <Header />
            <Carousel />
            <hr/>
            <Boxicon />
            <Main />
            <Footer />
          </Route>
          <Route path="/detail.html" exact>
            <Header />
            <Detail />
            <Footer />
          </Route>
          <Route path="/cart.html" exact>
            <Header />
            <Cart />
            <hr/>
            <Boxicon />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
}
export default App;
