import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Forgot extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="card mt-sm-5 bg-info">
                        <div className="row text-center ">
                            <div className="col-md-6 col-12 p-5 ">
                                <div className="card text-white bg-danger h-100 ">
                                    <div className="card-body item-left">
                                        <h4 className="card-title">Webcom to my website</h4>
                                        <p className="card-text">Lest go</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 p-5">
                                <h3>Forgot Password</h3>
                                <div className="form-group">
                                    <input type="email" className="form-control input-user" name="email" id aria-describedby="emailHelpId" placeholder="Enter email address..." />
                                </div>
                                <Link to="/index.html" className="btn btn-primary btn-user btn-block">
                                    Reset password</Link>
                                <hr />
                                <Link className="small text-light" to="/register.html">Register</Link>
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
