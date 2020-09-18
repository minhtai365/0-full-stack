import React, { Component } from 'react';
import ContentAccount from './ContentAccount';
import MenuAdmin from './MenuAdmin';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import Axios from 'axios';
import ContentTypes from './ContentTypes';
import ContentCatelogys from './ContentCatelogys';
import ContentProducts from './ContentProducts';

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:[]
        }
    }
    render() {
        return (
            <Router>
            <Switch>
            <div className="row">
                <div className="col-2">
                    <MenuAdmin/>
                </div>
                <div className="col-9">
                    
                {/* <ContentAccount /> */}
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
                </div>
            </div>
                    </Switch>
            </Router>
        )
    }
}
