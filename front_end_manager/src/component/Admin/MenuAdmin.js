import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class MenuAdmin extends Component {
    render() {
        return (
            <div className="position-fixed">
                <ul className="navbar-nav pl-2 my-nav bg-gradient-primary text-white">
                    <Link className="text-white text-30 d-flex align-items-center justify-content-center" to="/index">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink" />
                        </div>
                        <div className="mx-3">Minh Tai <sup>MT</sup></div>
                    </Link>
                    <div className="gachtrang" />
                    <li className="nav-item active ">
                        <Link className="nav-link text-white" to="/admin.html">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span>Info</span></Link>
                    </li>
                    <div className="gachtrang" />
                    <li className="nav-item">
                        <Link className="nav-link text-white collapsed" to="/account.html" >
                            <i className="fas fa-fw fa-wrench" />
                            <span>Tài khoản</span>
                        </Link>
                    </li>
                    <div className="gachtrang" />
                    <li className="nav-item">
                        <a className="nav-link text-white collapsed" href="#collapseone" data-toggle="collapse" aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-fw fa-cog" />
                            <span>Sản phẩm</span>
                        </a>
                        <div id="collapseone" className="collapse in" role="tabpanel">
                            <ul className="navbar-nav text-10">
                                <div className="gachtrang" />
                                <li className="nav-item ">
                                    <Link className="nav-link text-white" to="/types.html">
                                        <i className="fas fa-fw fa-table" />
                                        <span>Loại sản phẩm</span></Link>
                                </li>
                                <div className="gachtrang" />
                                <li className="nav-item ">
                                    <Link className="nav-link text-white" to="/catelogys.html">
                                        <i className="fas fa-fw fa-table" />
                                        <span>Doanh mục sản phẩm</span></Link>
                                </li>
                                <div className="gachtrang" />
                                <li className="nav-item ">
                                    <Link className="nav-link text-white" to="/products.html">
                                        <i className="fas fa-fw fa-table" />
                                        <span>Tất cả sản phẩm</span></Link>
                                </li>
                                <div className="gachtrang" />
                            </ul>
                        </div>
                    </li>
                    <div className="gachtrang" />
                    <li className="nav-item ">
                        <Link className="nav-link text-white" to="/orders.html">
                            <i className="fas fa-fw fa-chart-area" />
                            <span>Đơn hàng</span></Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                </ul>

            </div>
        )
    }
}
