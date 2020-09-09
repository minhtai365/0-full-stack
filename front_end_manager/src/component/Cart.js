import React, { Component } from 'react'

export default class Cart extends Component {
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
                                        <th>Kích thước</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><i className="fa fa-user icon-logo" aria-hidden="true" /></td>
                                        <td scope="row">Áo Xám Kẻ Sọc Dây Sát Nách</td>
                                        <td>M</td>
                                        <td>6</td>
                                        <td>100.000</td>
                                        <td>600.000</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fa fa-user icon-logo" aria-hidden="true" /></td>
                                        <td scope="row">Váy midi trơn xoè trắng</td>
                                        <td>M</td>
                                        <td>6</td>
                                        <td>100.000</td>
                                        <td>600.000</td>
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
