import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Regester extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="card mt-sm-5 bg-info">
                        <div className="row text-center ">
                            <div className="col-md-6 col-12 p-5 ">
                                <div className="card text-white bg-warning h-100 ">
                                    <div className="card-body item-left">
                                        <h4 className="card-title">Webcom to my website</h4>
                                        <p className="card-text">Lest go</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 p-5">
                                <h3>Register</h3>
                                <div className="row">
                                    <div className="col-sm-6 form-group ">
                                        <input type="text" className="form-control input-user" name="first" id placeholder="First Name" />
                                    </div>
                                    <div className="col-sm-6 form-group ">
                                        <input type="text" className="form-control input-user" name="last" id placeholder="Last Name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control input-user" name="email" id aria-describedby="emailHelpId" placeholder="Enter email address..." />
                                </div>
                                <div className=" row">
                                    <div className="col-sm-6 form-group">
                                        <input type="password" className="form-control input-user" name="pass" id placeholder="Password" />
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <input type="password" className="form-control input-user" name="repass" id placeholder="Repeat Password" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox small">
                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                        <label className="custom-control-label text-light" htmlFor="customCheck">Remember Me</label>
                                    </div>
                                </div>
                                <Link to="/index.html" className="btn btn-primary btn-user btn-block">
                                    Register account</Link>
                                <hr />
                                <Link to="/index.html" className="btn btn-danger btn-user btn-block">
                                    <i className="fab fa-google fa-fw" /> Register with Google</Link>
                                <Link to="/index.html" className="btn btn-primary btn-user btn-block">
                                    <i className="fab fa-facebook-f fa-fw" /> Register with Facebook</Link>
                                <hr />
                                <Link className="small text-light" to="/forgot.html">Forgot Password?</Link>
                                <br />
                                <Link className="small text-light" to="/login.html">Login!</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
