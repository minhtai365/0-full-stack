import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Footer from '../layout/Footer';
import Header from '../layout/Header';

export default class Forgot extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container content-chitiet">
                    <div className="card mt-sm-5  bg-info">
                        <div className="row text-center ">
                            <div className="col-md-6 col-12 p-5 ">
                                <div className="card text-white h-10">
                                    
                                <img src="./demo_html/img/forget.svg" height="200" alt=""/>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 p-5">
                                <h3>Forgot Password</h3>
                                <div className="form-group">
                                    <input type="email" className="form-control input-user"
                                    name="email" aria-describedby="emailHelpId" placeholder="Enter email address..." />
                                </div>
                                <Link to="/index" className="btn btn-primary btn-user btn-block">
                                    Reset password</Link>
                                <hr />
                                <Link className="small text-light" to="/register.html">Register</Link>
                                <br />
                                <Link className="small text-light" to="/login.html">Login!</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        
        )
    }
}
