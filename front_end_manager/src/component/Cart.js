import Axios from 'axios'
import React, { Component } from 'react'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dt: [],
            item: []

        }
    }

    componentWillMount() {
        Axios.get('/cartcustomer')
            .then(res => {
                var dt = res.data.filter(x => x.userid === localStorage.getItem("userID"));
                var data = Object.assign({}, dt)
                console.log(data[0].item);
                // console.log(data[0]);
                this.setState({
                    dt: data[0],
                    item: data[0].item
                })
            })
            .catch(err => {
                alert(err);
            })
    }
    render() {
        return (
            <div>
                <div className="container content-chitiet">
                    <div className="d-flex mb-4">
                        <li className="list-ds"><a href="#">Trang chủ &gt;</a></li>
                        <li className="list-ds" aria-current="page">Giỏ hàng</li>
                    </div>
                    <div className="text-center ">
                        <div className="container">
                            <h4>Giỏ hàng</h4>
                            <div className="d-flex justify-content-center">
                                <div className="item-giohang">Trợ giúp : 0352268668</div>
                                <div className="item-giohang">Chính sách đổi trả </div>
                                <div className="item-giohang">Chính sách giao hàng </div>
                                <div className="pl-2">Chính sách thanh toán </div>
                            </div>
                            <hr />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th />
                                        <th>Sản phẩm</th>
                                        <th>Đơn giá</th>
                                        <th>Số lượng</th>
                                        <th>Ngày thuê</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.item.map((x, key) =>
                                        <tr >
                                            <td><i className="fa fa-user icon-logo" aria-hidden="true" /></td>
                                            <td scope="row">{x.name}</td>
                                            <td>{x.price}</td>
                                            <td>{x.qty}</td>
                                            {x.buy='0'?<td>Mua</td>:<td>{x.buy}</td>}
                                            
                                        </tr>

                                    )}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    <td>{this.state.dt.totalprice}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary">Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
