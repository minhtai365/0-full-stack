import Axios from 'axios';
import { withFormik } from 'formik';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false
        }
    }
    
    isClick=()=>{
        if(this.props.values.token!==''){
            Axios.post('/user/resetpass',{
                email:this.props.values.email,
                token:this.props.values.token
            })
            .then(res=>{
                alert(res.data.mess + ' Mật khẩu của bạn là '+ this.props.values.token);
            })
        }
        else
        if(this.props.errors.email){
            alert('Email không hợp lệ')
        }else{
            Axios.get('/user')
            .then(res=>{
                var have=false;
                res.data.forEach(x => {
                    if(x.email===this.props.values.email){
                        have=true;
                    }
                });
                if(have===true){
                    Axios.post('/user/getpass',{
                        email:this.props.values.email
                    })
                    .then(res=>{
        
                    })
                    this.setState({
                        show:true
                    })
                }
                else{
                    alert('Email không tồn tại !!!')
                }
            })
          
        }
    }
    render() {
        return (
            <div>
                {/* <Header /> */}
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
                                {!this.state.show && <div className="form-group">
                                    <input type="email" className="form-control input-user"
                                    name="email" onChange={this.props.handleChange} placeholder="Enter email address..." />
                                    <small className="text-danger">{this.props.errors.email}</small>
                                </div>}
                                {this.state.show &&<div className="form-group">
                                    <input type="text" className="form-control input-user"
                                    name="token" onChange={this.props.handleChange} placeholder="Enter token..." />
                                    <small className="text-danger">{this.props.errors.token}</small>
                                </div>
                                }
                                <button onClick={()=>this.isClick()} className="btn btn-primary btn-user btn-block">
                                    Reset password</button>
                                <hr />
                                <Link className="small text-light" to="/register.html">Register</Link>
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
const FormikForm=withFormik({
    mapPropsToValues(){
        return{
            email:'',
            token:''
        } 
    },
    validationSchema:Yup.object().shape({
        email:Yup.string()
        .email()
        .required(),
        token:Yup.string()
        .length(6)
        .required()
    })

})(Forgot)
export default FormikForm