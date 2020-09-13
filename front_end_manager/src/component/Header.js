import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="fixed-top top-nav">
                    <div className="container  pt-2">
                        <div className=" float-left">
                            <a className="link-a ml-2" href="#"><i className="fa fa-map-marker" aria-hidden="true" /> Liên hệ</a>
                            <a className="link-a ml-2" href="callto:0352268668"><i className="fa fa-phone" aria-hidden="true" />
          0352268668</a>
                            <a className="link-a ml-2" href="mailto:tranminhtai365@gmail.com"><i className="fa fa-envelope" aria-hidden="true" />
          tranminhtai365@gmail.com</a>
                        </div>
                        <div className=" float-right">
                            <Link className="link-a ml-2" to="/login.html"><i className="fa fa-user" aria-hidden="true" />{this.props.name}</Link>
                            <Link className="link-a ml-2" to="/cart.html"> <span>Giỏ hàng của tôi</span></Link>
                        </div>
                    </div>
                </div>
                <div className="container bottom-nav">
                    <a className="navbar-brand" href="#"><i className="fa fa-user icon-logo" aria-hidden="true" /></a>
                    <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link className="nav-link " to="/index.html">Trang chủ</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link  dropdown-toggle" href="#" id="trangphuc" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Trang phục</a>
                                <div className="dropdown-menu" aria-labelledby="trangphuc">
                                    <a className="dropdown-item" href="#">Đầm dự tiệc</a>
                                    <a className="dropdown-item" href="#">Áo cưới</a>
                                    <a className="dropdown-item" href="#">Áo dài</a>
                                    <a className="dropdown-item" href="#">Cổ trang</a>
                                    <a className="dropdown-item" href="#">Khác</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link  dropdown-toggle" href="#" id="phukien" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phụ kiện</a>
                                <div className="dropdown-menu" aria-labelledby="phukien">
                                    <a className="dropdown-item" href="#">Túi sách</a>
                                    <a className="dropdown-item" href="#">Giày, gót</a>
                                </div>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link " href="#">Bảng giá</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link " href="#">Hướng dẫn dịch vụ</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2 botron30" type="text" placeholder="Search" />
                            <button className="btn btn-outline-primary botron30 my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

        )
    }
}
