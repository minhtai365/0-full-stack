import axios from 'axios';
import { withFormik } from 'formik';
import React, { Component } from 'react';
import GGLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';


class Regester extends Component {

    isClick = (e) => {
        e.preventDefault();
        if (Object.values(this.props.errors).length !== 0) {
            alert('Dữ liệu không hợp lệ')
        }
        else {
            axios.post('/user/register', {
                username: this.props.values.username,
                password: this.props.values.pass,
                name: this.props.values.name,
                email: this.props.values.email
            })
                .then(res => {
                    alert(res.data)
                    if (res.data === this.props.values.email) {
                        this.props.history.push('/login.html')
                    }
                })
        }
    }
    resGG = (res) => {
        var item=[];
        item.email= res.profileObj.email;
        item.pass = res.profileObj.googleId;
        item.name = res.profileObj.name;
        item.username = res.profileObj.email.slice(0,res.profileObj.email.search('@'));
        if(item!==[])
        axios.post('/user/register', {
            username: item.username,
            password: item.pass,
            name: item.name,
            email: item.email
        })
            .then(res => {
                alert(res.data)
                if (res.data === item.email) {
                    this.props.history.push('/login.html')
                }
            })
    }
    render() {
        return (
            <div>
                {/* <Header /> */}
                <div className="container" style={{ paddingTop: '100px' }}>
                    <div className="card mt-sm-5 bg-info">
                        <div className="row text-center ">
                            <div className="col-md-6 col-12 p-5 ">
                                <div className="card text-white  h-10">

                                    <img src="./demo_html/img/register.svg" height="500" alt="" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 p-5">
                                <h3>Register</h3>
                                <div className="row">
                                    <div className="col-sm-6 form-group ">
                                        <input type="text" onChange={this.props.handleChange} className="form-control input-user" name="name" placeholder="Name" />

                                        <small className="form-text text-danger text-muted">{this.props.errors.name}</small>
                                    </div>
                                    <div className="col-sm-6 form-group ">
                                        <input type="text" onChange={this.props.handleChange} className="form-control input-user" name="username" placeholder="UserName" />


                                        {this.props.errors.username !== undefined ? <small className="form-text text-danger text-muted">{this.props.errors.username}</small>
                                            : !(/^[A-Za-z0-9_\.]{0,32}$/).test(this.props.values.username) && <small className="form-text text-danger text-muted">Username invalid !!!</small>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" onChange={this.props.handleChange} className="form-control input-user"
                                        name="email" aria-describedby="emailHelpId" placeholder="Enter email address..." />


                                    {!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/).test(this.props.values.email) && <small className="form-text text-danger text-muted">Email invalid !!!</small>}
                                </div>
                                <div className=" row">
                                    <div className="col-sm-6 form-group">
                                        <input type="password" onChange={this.props.handleChange} className="form-control input-user" name="pass" placeholder="Password" />

                                        <small className="form-text text-danger text-muted">{this.props.errors.pass}</small>
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <input type="password" onChange={this.props.handleChange} className="form-control input-user" name="repass" placeholder="Repeat Password" />

                                        <small className="form-text text-danger text-muted">{this.props.errors.repass}</small>
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
                                <GGLogin
                                    clientId="538190497449-25f8o6rrd2mdob2mt7v04phithg25rap.apps.googleusercontent.com"
                                    onSuccess={this.resGG}
                                    onFailure={this.resGG}
                                    render={renderProps => (
                                        <button className="px-5 btn btn-danger btn-user btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                            <i className="fab fa-google fa-fw" />
                                            <span> Register with Google</span>
                                        </button>
                                    )}
                                />
                                {/* <Link to="/index.html" className="btn btn-primary btn-user btn-block">
                                    <i className="fab fa-facebook-f fa-fw" /> Register with Facebook</Link> */}
                                <hr />
                                <Link className="small text-light" to="/forgot.html">Forgot Password?</Link>
                                <br />
                                <Link className="small text-light" to="/login.html">Login!</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
}
const FormikForm = withFormik({
    mapPropsToValues() {
        return ({
            name: '',
            username: '',
            email: '',
            pass: '',
            repass: ''
        })
    }, validationSchema: Yup.object().shape({
        name: Yup.string()
            .required('Name is required!!!'),
        username: Yup.string()
            .min(3, "Username phải tối thiểu 3 ký tự!!!")
            .required('Username is required !!!'),
        email: Yup.string().
            email('Invalid email format!!!')
            .required('Email is required !!!'),
        pass: Yup.string()
            .min(6, "Mật khẩu phải tối thiểu 6 ký tự!!!")
            .required('Password is required !!!'),
        repass: Yup.string()
            .oneOf([Yup.ref('pass')], 'Password không khớp')
            .required('Password is required !!!')
    })
})(Regester)
export default FormikForm
