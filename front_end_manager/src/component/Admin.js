import React, { Component } from 'react';
import ContentAccount from './ContentAccount';
import MenuAdmin from './MenuAdmin';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import Axios from 'axios';
import ContentTypes from './ContentTypes';
import ContentCatelogys from './ContentCatelogys';
import ContentProducts from './ContentProducts';

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
    }
    render() {
        return (
            <Router>
                 <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-gradient-primary text-white">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item dropdown ">
                                {/* <div className="d-flex justify-content-end"> */}
                                    <button className="nav-link dropdown-toggle text-light btn btn-link" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tài khoản</button>
                                
                                {/* </div> */}
                                <div className="dropdown-menu" aria-labelledby="dropdownId">
                                    <button className="dropdown-item">Đăng xuất</button>
                                    <button className="dropdown-item">Thông tin</button>
                                </div>
                            </li>
                        </ul>
                    </nav>
                <div className="row mt-5 pt-4">
                   
                    <div className="col-2">
                        <MenuAdmin />
                    </div>
                    <div className="col-9">
                        <Switch>
                            <Route path="/admin.html">
                                <ContentAccount />
                            </Route>
                            <Route exact path="/types.html">
                                <ContentTypes />
                            </Route>
                            <Route exact path="/catelogys.html">
                                <ContentCatelogys />
                            </Route>
                            <Route exact path="/products.html">
                                <ContentProducts />
                            </Route>
                            <Route exact path="/carts.html">
                                <ContentAccount />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
