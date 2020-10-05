import Axios from 'axios';
import React, { Component } from 'react';

import Model from 'react-modal';
import MenuAdmin from './MenuAdmin';
import NavAdmin from './NavAdmin';
// import { Link } from 'react-router-dom';

export default class ContentCarts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datacarts: [],
            isShow: false,
            item: []
        }

    }
    componentWillMount() {
        Axios.get('/order')
            .then(res => {
                var dt = { ...res.data }
                res.data.map(x => {
                    console.log(x.item);
                })
                this.setState({
                    datacarts: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    changShow() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    componentDidMount() {
        Model.setAppElement("#modal");
    }
    showModel = (id) => {
        var dt = this.state.datacarts.filter(x => x._id === id);
        console.log(dt[0].item);
        this.setState({
            item: dt[0].item
        })
        this.changShow();
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
                                        <th>Hình ảnh</th>
                                        <th>Mã sản phẩm</th>

                                        <th>Tên</th>
                                        <th>số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Mua/Thuê</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.item.map(x => {
                                        return <tr>
                                            <td><img src={x.img} width="50" alt="Hình" /></td>
                                            <td>{x.productid}</td>
                                            <td>{x.name}</td>
                                            <td>{x.qty}</td>
                                            <td>{x.price}</td>
                                            {x.typeorder === '1' ? <td>Mua</td> : x.typeorder === '0.3' ? <td>Thuê 1 Ngày</td> : x.typeorder === '0.5' ?
                                                <td>Thuê 3 Ngày</td> : <td>Thuê 7 Ngày</td>}
                                        </tr>

                                    })}
                                </tbody>
                            </table>
                            <button className="btn btn-primary" type="reset" onClick={this.setData} >OK</button>
                        </div>
                    </Model>

                    <div className='container-md' id="modal">
                        <table className="table table-bordered table-hover table-inverse table-responsive">
                            <thead className="thead-dark">
                                <tr>
                                    <th>CMND</th>
                                    <th>Tên</th>
                                    <th>SĐT</th>
                                    <th>Địa chỉ</th>
                                    <th>Quận/Huyện</th>
                                    <th>Thành phố/Tỉnh</th>
                                    <th>Tổng cộng</th>
                                    <th>Ngày đặt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.datacarts.map(x => {
                                    return <tr>
                                        <td>{x.contact.cmnd}</td>
                                        <td>{x.contact.name}</td>
                                        <td>{x.contact.sdt}</td>
                                        <td>{x.contact.address}</td>
                                        <td>{x.contact.quan}</td>
                                        <td>{x.contact.tp}</td>
                                        <td>{x.total}</td>
                                        <td>{x.date}</td>

                                        <td><div className="text-info" onClick={(id) => this.showModel(x._id)} ><i className="fas fa-edit"></i></div>
                                            <hr />
                                            <div className="text-danger" onClick={(id) => this.remove(x._id)} ><i className="far fa-trash-alt"></i></div></td>
                                    </tr>

                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
