
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
// var getUser = () => axios.get('/user').then(res => res.data);
class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: []
        }
    }
    // componentWillMount(){
    //     getUser().then(res=>{
    //         this.setState({
    //             user:res
    //         })
    //     })
    // }
    isChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        })
    }
    isClick = (e) => {
        e.preventDefault();
        var item = [];
        item.email = this.state.email;
        item.password = this.state.pass;
        this.sendDT(item.email, item.password).then(res => {
            if (res !== 'fail') {
                localStorage.setItem("userID",res._id);
                console.log(res.username);
                this.props.senduser(res.username);
                this.props.history.push('/index');
            }
            else {
                alert("Sai tài khoản");
            }
        });

    }
    sendDT = (email, password) => axios.post('/login', { email, password }).then(res => res.data)
    render() {
        return (
            <div>
                <Header />
                <div className="container mt-5 pt-5">
                    {/* {document.body.style.backgroundColor = "blue"} */}
                    <div className="card mt-sm-5 bg-info">
                        <div className="row text-center ">
                            <div className="col-md-6 col-12 p-5 ">
                                <div className="card text-white ">
                                    <img src="./demo_html/img/login.svg"alt=""/>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 p-5">
                                <h3 >Login</h3>
                                <form>
                                    <div className="form-group">
                                        <input type="email" onChange={this.isChange} className="form-control input-user" name="email" aria-describedby="emailHelpId" placeholder="Enter email address..." />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" onChange={this.isChange} className="form-control input-user" name="pass" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox small">
                                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                                            <label className="custom-control-label text-light" htmlFor="customCheck">Remember Me</label>
                                        </div>
                                    </div>
                                    <Link to="/index.html" onClick={this.isClick} className="btn btn-primary btn-user btn-block">Login</Link>
                                    <hr />
                                    <Link to="/index.html" className="btn btn-danger btn-user btn-block">
                                        <i className="fab fa-google fa-fw" /> Login with Google</Link>
                                    <br />
                                    <Link to="/index.html" className="btn btn-primary btn-user btn-block">
                                        <i className="fab fa-facebook-f fa-fw" /> Login with Facebook</Link>
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
export default withRouter(Login)