import { withFormik } from 'formik';
import * as Yup from 'yup';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
// import FBLogin from 'react-facebook-login';
import GGLogin from 'react-google-login';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: []
        }
    }

    isClick = (e) => {
        e.preventDefault();
        if (Object.values(this.props.errors).length === 0) {
            var item = [];
            item.username = this.props.values.username;
            item.password = this.props.values.pass;

            this.sendDT(item.username, item.password).then(res => {
                // console.log(res);
                if (res !== 'fail') {
                    if (res.status === true) {
                        sessionStorage.setItem("userID", res._id);
                        sessionStorage.setItem("username", res.name);
                        if (res.role === '1')
                            this.props.history.push('/admin.html');
                        else this.props.history.push('/index');
                    }
                    else {
                        alert('Tài khoản bị khóa !!!')
                    }
                }
                else {
                    alert("Tài khoản hoặc mật khẩu không đúng !!!");
                }
            });

        } else {
            alert('Dữ liệu không hợp lệ')
        }

    }
    sendDT = (username, password) => axios.post('/user/login', { username, password }).then(res => res.data)
    //     resFB = (res) => {
    //         console.log(res);
    //     }
    //     <FBLogin
    //     appId='1053816905068754'
    //     fields='name,email,picture'
    //     callback={this.resFB}
    // />
    resGG = (res) => {
        var item=[];
        item.email= res.profileObj.email;
        item.pass = res.profileObj.googleId;
        if(item !==[]){
            this.sendDT(item.email, item.pass).then(res => {
                // console.log(res);
                if (res !== 'fail') {
                    if (res.status === true) {
                        sessionStorage.setItem("userID", res._id);
                        sessionStorage.setItem("username", res.name);
                        if (res.role === '1')
                            this.props.history.push('/admin.html');
                        else this.props.history.push('/index');
                    }
                    else {
                        alert('Tài khoản bị khóa !!!')
                    }
                }
                else {
                    alert("Tài khoản hoặc mật khẩu không đúng !!!");
                }
            });
        }
    }
    render() {

        return (
            <div>
                <Header />
                <div className="container-md" style={{ paddingTop: '120px' }}>
                    {/* {document.body.style.backgroundColor = "blue"} */}
                    <div className="card mt-sm-5 bg-info">
                        <div className="row text-center ">
                            <div className="col-md-6 col-12 px-sm-5 px-4 py-4 ">
                                <div className="card text-white ">
                                    <img src="./demo_html/img/login.svg" alt="" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 px-sm-5 px-4">
                                <h3 >Login</h3>
                                <form>
                                    <div className="form-group">
                                        <input type="text" onChange={this.props.handleChange} defaultValue={this.props.values.username}
                                            className="form-control input-user" name="username" placeholder="Enter email address or username..." />

                                        <small className="form-text text-danger text-muted">{this.props.errors.username}</small>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" onChange={this.props.handleChange} className="form-control input-user"
                                            defaultValue={this.props.values.pass} name="pass" placeholder="Password" />

                                        <small className="form-text text-danger text-muted">{this.props.errors.pass}</small>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox small">
                                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                                            <label className="custom-control-label text-light" htmlFor="customCheck">Remember Me</label>
                                        </div>
                                    </div>

                                    <Link to="/index.html" onClick={this.isClick} className="btn btn-primary btn-user btn-block">Login</Link>
                                    <hr />

                                    {/* <Link to="/index.html" className="btn btn-danger btn-user btn-block">
                                        <i className="fab fa-google fa-fw" /> Login with Google</Link> */}

                                    <GGLogin
                                        clientId="538190497449-25f8o6rrd2mdob2mt7v04phithg25rap.apps.googleusercontent.com"
                                        onSuccess={this.resGG}
                                        onFailure={this.resGG}
                                        render={renderProps => (
                                            <button className="px-5 btn btn-danger btn-user btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                <i className="fab fa-google fa-fw" />
                                                <span> Login with Google</span>
                                            </button>
                                        )}
                                    />
                                    {/* <Link to="/index.html" className="btn btn-primary btn-user btn-block">
                                        <i className="fab fa-facebook-f fa-fw" /> Login with Facebook</Link> */}
                                    <hr />
                                    <Link className="small text-light" to="/forgot.html">Forgot Password?</Link>
                                    <br />
                                    <Link className="small text-light" to="/register.html">Create an Account!</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
const FormikForm = withFormik({
    mapPropsToValues() {
        return {
            pass: '',
            username: ''
        }
    },
    validationSchema: Yup.object().shape({
        pass: Yup.string()
            .required('Password is required !!!')
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự !!!')
            .max(18, 'Mật khẩu tối đa 18 ký tự !!!'),
        username: Yup.string()
            .required('Username is required!!!')

    })
})(Login)
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         senduser: (user) => {
//             dispatch({type:"GET_USER_LOGIN",user})
//         }
//     }
// }
// const mapStateToProps = (state, ownProps) => {
//     return {
//         // prop: state.prop
//     }
// }
export default withRouter(FormikForm);