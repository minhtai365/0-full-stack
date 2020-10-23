import axios from 'axios';
import { withFormik } from 'formik';
import React from 'react';
// import FBLogin from 'react-facebook-login';
import GGLogin from 'react-google-login';
import { Link, withRouter } from 'react-router-dom';
import * as Yup from 'yup';
function Login(props) {
const isClick = (e) => {
        e.preventDefault();
        if (Object.values(props.errors).length === 0) {
            var item = [];
            item.username = props.values.username;
            item.password = props.values.pass;

            sendDT(item.username, item.password).then(res => {
                if (res !== 'fail') {
                    if (res.status === true) {
                        sessionStorage.setItem("userID", res._id);
                        sessionStorage.setItem("username", res.name);
                        if (res.role === '1'){
                            props.history.push('/admin');
                        }
                        else props.history.push('/index');
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
    const sendDT = (username, password) => axios.post('/user/login', { username, password }).then(res => res.data)
    //     resFB = (res) => {
    //         console.log(res);
    //     }
    //     <FBLogin
    //     appId='1053816905068754'
    //     fields='name,email,picture'
    //     callback={this.resFB}
    // />
    const resGG = (res) => {
        var item=[];
        item.email= res.profileObj.email;
        item.pass = res.profileObj.googleId;
        if(item !==[]){
            sendDT(item.email, item.pass).then(res => {
                if (res !== 'fail') {
                    if (res.status === true) {
                        sessionStorage.setItem("userID", res._id);
                        sessionStorage.setItem("username", res.name);
                        if (res.role === '1')
                            props.history.push('/admin.html');
                        else props.history.push('/index');
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
        return (
            <div>
                {/* <Header /> */}
                <div className="container-md" style={{ paddingTop: '100px' }}>
                    {/* {document.body.style.backgroundColor = "blue"} */}
                    <div className="card mt-sm-5 bg-info">
                        <div className="row text-center ">
                            <div className="col-md-6 col-12 px-sm-5 px-4 py-4 ">
                                <div className="card h-10 text-white ">
                                    <img src="./demo_html/img/login.svg" alt="" />
                                </div>
                            </div>
                            <div className="col-md-6 col-12 px-sm-5 px-4">
                                <h3 >Login</h3>
                                <form>
                                    <div className="form-group">
                                        <input type="text" onChange={props.handleChange} defaultValue={props.values.username}
                                            className="form-control input-user" name="username" placeholder="Enter email address or username..." />

                                        <small className="form-text text-danger text-muted">{props.errors.username}</small>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" onChange={props.handleChange} className="form-control input-user"
                                            defaultValue={props.values.pass} name="pass" placeholder="Password" />

                                        <small className="form-text text-danger text-muted">{props.errors.pass}</small>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox small">
                                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                                            <label className="custom-control-label text-light" htmlFor="customCheck">Remember Me</label>
                                        </div>
                                    </div>

                                    <Link to="/index.html" onClick={isClick} className="btn btn-primary btn-user btn-block">Login</Link>
                                    <hr />

                                    {/* <Link to="/index.html" className="btn btn-danger btn-user btn-block">
                                        <i className="fab fa-google fa-fw" /> Login with Google</Link> */}

                                    <GGLogin
                                        clientId="538190497449-25f8o6rrd2mdob2mt7v04phithg25rap.apps.googleusercontent.com"
                                        onSuccess={resGG}
                                        onFailure={resGG}
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
                {/* <Footer /> */}
            </div>
        )
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