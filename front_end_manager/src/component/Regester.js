import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
export default class Regester extends Component {
    isChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    isClick = (e) => {
        e.preventDefault();
        console.log('click');
        if (this.state.pass !== this.state.repass) alert('Mật khẩu không khớp');
        else {
            axios.post('/register', {
                username: this.state.last,
                password: this.state.pass,
                name: this.state.first,
                email: this.state.email
            })
                .then(res => {
                    alert(res.data)
                    if (res.data === this.state.email) {
                        this.props.history.push('/login.html')
                    }
                })
        }
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container mt-5 pt-5">
                    <div className="card mt-sm-5 bg-info">
                        <div className="row text-center ">
                            <div className="col-md-6 col-12 p-5 ">
                                <div className="card text-white">
                                    
                                <img src="./demo_html/img/register.svg" height="500" alt=""/>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 p-5">
                                <h3>Register</h3>
                                <div className="row">
                                    <div className="col-sm-6 form-group ">
                                        <input type="text" onChange={this.isChange} className="form-control input-user" name="first" id placeholder="Name" />
                                    </div>
                                    <div className="col-sm-6 form-group ">
                                        <input type="text" onChange={this.isChange} className="form-control input-user" name="last" id placeholder="UserName" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" onChange={this.isChange} className="form-control input-user" name="email" id aria-describedby="emailHelpId" placeholder="Enter email address..." />
                                </div>
                                <div className=" row">
                                    <div className="col-sm-6 form-group">
                                        <input type="password" onChange={this.isChange} className="form-control input-user" name="pass" id placeholder="Password" />
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <input type="password" onChange={this.isChange} className="form-control input-user" name="repass" id placeholder="Repeat Password" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox small">
                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                        <label className="custom-control-label text-light" htmlFor="customCheck">Remember Me</label>
                                    </div>
                                </div>
                                <Link to="/index.html" onClick={this.isClick} className="btn btn-primary btn-user btn-block">
                                    Register account</Link>
                                <hr />
                                <Link to="/index.html" className="btn btn-danger btn-user btn-block">
                                    <i className="fab fa-google fa-fw" /> Register with Google</Link>
                                    <br/>
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
                <Footer />
            </div>
        )
    }
}
