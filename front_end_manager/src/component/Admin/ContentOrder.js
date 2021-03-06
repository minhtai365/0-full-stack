import Axios from 'axios';
import React, { Component } from 'react';
import { Pagination } from '@material-ui/lab';

import Model from 'react-modal';
import NavAdmin from './NavAdmin';
// import { Link } from 'react-router-dom';

export default class ContentCarts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datacarts: [],
            isShow: false,
            item: [],
            page:1,
            typed:'Ngày đặt'
        }

    }
    componentWillMount() {
        Axios.get('/order')
            .then(res => {
                this.setState({
                    datacarts: res.data
                })
            })
    }
    changShow() {
        Axios.get('/order')
            .then(res => {
                this.setState({
                    datacarts: res.data,
                    isShow: !this.state.isShow
                })
            })
    }
    componentDidMount() {
        Model.setAppElement("#modal");
    }
    showModel = (id, status) => {
        var dt = this.state.datacarts.filter(x => x._id === id);
        this.setState({
            item: dt[0].item,
            orderID: id,
            status: status
        })
        this.changShow();
    }
    setData = () => {
        Axios.post('/order/confirm', {
            id: this.state.orderID
        })
            .then(res => {
                this.changShow();
                alert(res.data.mess);
                Axios.get('/order')
                    .then(res => {
                        var dt = res.data.filter(x => x.userid === sessionStorage.getItem('userID'));

                        this.setState({
                            dt: dt
                        })

                    })
            })
    }
    clickComplete = () => {
        Axios.post("/order/complete", {
            id: this.state.orderID
        })
            .then(res => {
                Axios.get('/order')
                    .then(res => {
                        this.changShow();
                        var dt = res.data.filter(x => x.userid === sessionStorage.getItem('userID'));

                        alert(res.data.mess);
                        this.setState({
                            dt: dt
                        })

                    })
            })
    }
    clickCancel = () => {
        Axios.post("/order/cancel", {
            id: this.state.orderID,
            item: this.state.item
        })
            .then(res => {
                Axios.get('/order')
                    .then(res => {
                        this.changShow();
                        var dt = res.data.filter(x => x.userid === sessionStorage.getItem('userID'));

                        alert(res.data.mess);
                        this.setState({
                            dt: dt
                        })

                    })
            })
    }
    ischange = (e) => {
        this.setState({
            typed:e.target.value
        })
    }
    inputValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    find = (e) => {
        if (e.key === "Enter") {
        var dt=[];
        Axios.get('/order')
        .then(res => {
            res.data.forEach(x=>{
                if(x.contact.name.toLowerCase().indexOf(this.state.search) !== -1||
                x._id.toLowerCase().indexOf(this.state.search) !== -1||
                x.contact.cmnd.toLowerCase().indexOf(this.state.search) !== -1||
                x.contact.phone.toLowerCase().indexOf(this.state.search) !== -1){
                    dt.push(x);
                }
            })
                this.setState({
                    datacarts:dt
                })
        })
    }
}
    clicksearch=()=>{
        var dt=[];
        Axios.get('/order')
        .then(res => {
            res.data.forEach(x=>{
                if(x.contact.name.toLowerCase().indexOf(this.state.search) !== -1||
                x._id.toLowerCase().indexOf(this.state.search) !== -1||
                x.contact.cmnd.toLowerCase().indexOf(this.state.search) !== -1||
                x.contact.phone.toLowerCase().indexOf(this.state.search) !== -1){
                    dt.push(x);
                }
            })
                this.setState({
                    datacarts:dt
                })
        })
        
    }
    clickredo=()=>{
        Axios.get('/order')
            .then(res => {
                this.setState({
                    datacarts: res.data
                })
            })
        
    }
    handleChange = (event, value) => {
        this.setState({
            page: value
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
                    <Model
                        isOpen={this.state.isShow}
                        className="modal-order"
                        overlayClassName="Overlay">
                        <div className="form-group">
                            <div className=" d-flex justify-content-end">
                                <button className="text-danger " onClick={() => this.changShow()} ><i className="far fa-times-circle"></i></button>
                            </div>
                            <table className="table table-bordered table-hover table-inverse table-responsive">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Mã sản phẩm</th>
                                        <th>Hình ảnh</th>
                                        <th>Tên</th>
                                        <th>số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Mua/Thuê</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.item.map(x => {
                                        return <tr>
                                            <td>{x.productid}</td>
                                            <td><img src={x.img} width="50" alt="Hình" /></td>
                                            <td>{x.name}</td>
                                            <td>{x.qty}</td>
                                            <td>{x.price}</td>
                                            {x.typeorder === '1' ? <td>Mua</td> : x.typeorder === '0.3' ? <td>Thuê 1 Ngày</td> : x.typeorder === '0.5' ?
                                                <td>Thuê 3 Ngày</td> : <td>Thuê 7 Ngày</td>}
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            {this.state.status === 1 && <div><button className="btn btn-danger" type="reset" onClick={() => this.clickCancel()} >Hủy</button>
                                <button className="btn btn-primary" type="reset" onClick={() => this.setData()} >Khách nhận hàng</button></div>}
                            {this.state.status === 2 && <button className="btn btn-primary" type="reset" onClick={() => this.clickComplete()} >Khách bàn giao</button>}
                        </div>
                    </Model>

                    <div className='mx-5' id="modal">

                    <div className="content-right d-flex justify-content-end">
                                    <span className="form-inline  p-1">
                                    <div className=" sea  fas fa-redo text-dark" onClick={() => this.clickredo()}></div>
                                        <input className=" sea  shadow-none mr-sm-2 px-3 border-0 fff" name="search" onKeyDown={(e)=>this.find(e)} onChange={(e) => this.inputValue(e)} type="text" placeholder="Nhập tên sản phẩm cần tìm ...." />
                                        <div className=" sea  fas fa-search text-dark" onClick={() => this.clicksearch()}></div>

                                    </span>
                                </div>
                        <table className="table table-bordered table-hover table-inverse table-responsive">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>CMND</th>
                                    <th>Tên</th>
                                    <th>SĐT</th>
                                    <th>Địa chỉ</th>
                                    <th>Quận/Huyện</th>
                                    <th>Thành phố/Tỉnh</th>
                                    <th>Tổng cộng</th>
                                    <th>
                                        <div className="form-group">
                                            <select  onChange={(e) => this.ischange(e)} className="form-control" name="typed">
                                                <option>Ngày đặt</option>
                                                <option>Ngày nhận</option>
                                                <option>Ngày bàn giao</option>
                                                <option>Ngày hủy</option>
                                            </select>
                                        </div>

                                    </th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.datacarts.slice((this.state.page - 1) * 5, this.state.page * 5).map(x => {
                                    return <tr>
                                        <td>{x._id}</td>
                                        <td>{x.contact.cmnd}</td>
                                        <td>{x.contact.name}</td>
                                        <td>{x.contact.phone}</td>
                                        <td>{x.contact.address}</td>
                                        <td>{x.contact.quan}</td>
                                        <td>{x.contact.tp}</td>
                                        <td>{x.total}</td>
                                       {this.state.typed==='Ngày đặt' &&  <td>{x.datelc}</td>}
                                       {this.state.typed==='Ngày bàn giao' &&  <td>{x.datecom}</td>}
                                       {this.state.typed==='Ngày nhận' &&  <td>{x.dateget}</td>}
                                       {this.state.typed==='Ngày hủy' &&  <td>{x.datecan}</td>}
                                        <td className="text-primary">{x.status === 1 ? "Chờ nhận" : x.status === 2 ? 'Đã nhận' :
                                            x.status === 3 ? 'Đã bàn giao' : x.status === 4 ? 'Hoàn thành' : 'Đã hủy'}</td>
                                        {/* <td><div className="btn btn-warning" onClick={(id) => this.showModel(x._id)} 
                                         >{x.status===1?"Chờ xác nhận":x.status===2?'Đang giao':
                                 x.status===3?'Đã giao':'Đã hủy'} </div></td> */}
                                        <td><div className="text-info" onClick={() => this.showModel(x._id, x.status)} ><i className="fas fa-edit"></i></div></td>
                                    </tr>

                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                        <Pagination count={parseInt(this.state.datacarts.length / 5) + 1} page={this.state.page} onChange={this.handleChange} />
                    </div>
            </div>
        );
    }
}
