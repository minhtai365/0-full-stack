import React, { Component } from 'react'

export default class MenuAdmin extends Component {
    render() {
        return (
            <div>
                <ul className="navbar-nav pl-2 my-nav bg-gradient-primary text-white">
                    {/* Sidebar - Brand */}
                    <a className="text-white text-30 d-flex align-items-center justify-content-center" href="index.html">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink" />
                        </div>
                        <div className="mx-3">Minh Tai <sup>MT</sup></div>
                    </a>
                    {/* Divider */}
                    <div className="gachtrang" />
                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active ">
                        <a className="nav-link text-white" href="index.html">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span>Dashboard</span></a>
                    </li>
                    {/* Divider */}
                    <div className="gachtrang" />
                    {/* Heading */}
                    <div className="sidebar-heading">
                        Tài khoản
  </div>
                    {/* Nav Item - Utilities Collapse Menu */}
                    <li className="nav-item">
                        <a className="nav-link text-white collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-wrench" />
                            <span>Tài khoản</span>
                        </a>
                    </li>
                    {/* Divider */}
                    <div className="gachtrang" />
                    {/* Heading */}
                    <div className="sidebar-heading">
                        Sản phẩm
  </div>
                    <li className="nav-item">
                        <a className="nav-link text-white collapsed" href="#collapseone" data-toggle="collapse" aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-fw fa-cog" />
                            <span>Sản phẩm</span>
                        </a>
                        <div id="collapseone" className="collapse in" role="tabpanel">
                            <ul className="navbar-nav text-10">
                                <div className="gachtrang" />
                                <li className="nav-item ">
                                    <a className="nav-link text-white" href="tables.html">
                                        <i className="fas fa-fw fa-table" />
                                        <span>Loại sản phẩm</span></a>
                                </li>
                                <div className="gachtrang" />
                                <li className="nav-item ">
                                    <a className="nav-link text-white" href="tables.html">
                                        <i className="fas fa-fw fa-table" />
                                        <span>Doanh mục sản phẩm</span></a>
                                </li>
                                <div className="gachtrang" />
                                <li className="nav-item ">
                                    <a className="nav-link text-white" href="tables.html">
                                        <i className="fas fa-fw fa-table" />
                                        <span>Tất cả sản phẩm</span></a>
                                </li>
                                <div className="gachtrang" />
                            </ul>
                        </div>
                    </li>
                    <div className="gachtrang" />
                    {/* Heading */}
                    <div className="sidebar-heading">
                        Đơn hàng
  </div>
                    {/* Nav Item - Charts */}
                    <li className="nav-item ">
                        <a className="nav-link text-white" href="charts.html">
                            <i className="fas fa-fw fa-chart-area" />
                            <span>Đơn hàng</span></a>
                    </li>
                    {/* Divider */}
                    <hr className="sidebar-divider d-none d-md-block" />
                    {/* Sidebar Toggler (Sidebar) */}
                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle" />
                    </div>
                </ul>

            </div>
        )
    }
}
