import Axios from 'axios'
import React, { Component } from 'react'
import NavAdmin from './NavAdmin'

export default class InfoAdmin extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:'',
            phone:'',
            email:'',
            address:'',
            vchuyen:'',
            ttoan:'',
            dtra:''
        }
    }
    
    componentWillMount(){
        Axios.get('/info')
        .then(res=>{
            this.setState({
                name:res.data[0].name,
                phone:res.data[0].phone,
                email:res.data[0].email,
                address:res.data[0].address,
                vchuyen:res.data[0].vchuyen,
                ttoan:res.data[0].ttoan,
                dtra:res.data[0].dtra
            })
        })
    }
    saveClick=()=>{
        const {name,phone,email,address,ttoan,vchuyen,dtra}=this.state;
        Axios.post('/info/set',{
            name:name,
            phone:phone,
            email:email,
            address:address,
            vchuyen:vchuyen,
            ttoan:ttoan,
            dtra:dtra
        })
        .then(r=>{
            alert(r.data.mess);
            Axios.get('/info')
            .then(res=>{
                this.setState({
                    dt:res.data
                })
            })
        })
    }
    ischange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        return (
            <div>
                <NavAdmin />
                <div className="row mt-5 pt-4">
                    {/* <div className="col-2">
                        <MenuAdmin />
                    </div> */}
                    <div className="container">
                        <div className="row mt-4 ml-5">
                            <div className="col-md-6 col-12">
                                <div className="form-group ">
                                    <label >Tên Shop</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => this.ischange(e)} required name="name" defaultValue={this.state.name} />
                                </div>
                                <div className="form-group">
                                    <label >Số điện thoại</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => this.ischange(e)} required name="phone" defaultValue={this.state.phone} />
                                </div>
                                <div className="form-group">
                                    <label >Email</label>
                                    <input type="email"
                                        className="form-control" onChange={(e) => this.ischange(e)} required name="email" defaultValue={this.state.email} />
                                </div>
                                <div className="form-group ">
                                    <label >Địa chỉ</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => this.ischange(e)} required name="address" defaultValue={this.state.address} />
                                </div>
                                <button className="btn btn-primary" onClick={()=>this.saveClick()}> Lưu</button>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label>Chính sách thanh toán</label>
                                    <textarea className="form-control" onChange={(e) => this.ischange(e)}  name="ttoan" rows="3" defaultValue={this.state.ttoan}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Chính sách đổi trả</label>
                                    <textarea className="form-control" onChange={(e) => this.ischange(e)}  name="dtra" rows="3" defaultValue={this.state.dtra}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Chính sách giao hàng</label>
                                    <textarea className="form-control" onChange={(e) => this.ischange(e)}  name="vchuyen" rows="3" defaultValue={this.state.vchuyen}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
