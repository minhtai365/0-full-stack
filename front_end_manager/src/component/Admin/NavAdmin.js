import Axios from 'axios';
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

class NavAdmin extends Component {
    componentWillMount() {
        var kq=false;
        Axios.get('/user')
        .then(res=>{
            res.data.filter(x=>{
                if(x._id===sessionStorage.getItem('userID') && x.role==='1')
                kq=true
            })
            if (kq===false) {
                alert('Truy cập bị từ chối!!!');
                this.props.history.push('/index');
            }
        })
      
    }
    clickOut = () => {
        sessionStorage.removeItem("userID");
        this.props.history.push('/index');
    }
    render() {
        return (
            <nav className="navbar navbar-expand fixed-top navbar-light bg-gradient-primary text-white">
               
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="list-group-item nav-link btn btn-link ">
                        <Link className="text-white" to="/index">
                                <i className="fas fa-laugh-wink" />
                            <span className="">Minh Tai <sup>MT</sup></span>
                        </Link>
                    </li>
                    <li className="list-group-item nav-link btn btn-link ">
                        <Link className="text-white" to="/admin">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span>Info</span></Link>
                    </li>
                    <li className="list-group-item nav-link btn btn-link ">
                        <Link className="text-white" to="/admin/imgslide.html">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span>Img Slide</span></Link>
                    </li>
                    <li className="list-group-item nav-link btn btn-link">
                        <Link className="text-white" to="/admin/account.html" >
                            <i className="fas fa-fw fa-wrench" />
                            <span>Tài khoản</span>
                        </Link>
                    </li>
                    <li className="list-group-item nav-link btn btn-link text-white "> <i className="fas fa-fw fa-chart-area" />
                        <span>Sản phẩm</span>
                        <ul className="list-group item-title list-sub position-absolute">
                            <li className="nav-item item-con">
                                <Link className="nav-link text-white" to="/admin/types.html">
                                    <i className="fas fa-fw fa-table" />
                                    <span>Loại sản phẩm</span></Link>
                            </li>
                            <div className="gachtrang" />
                            <li className="nav-item item-con">
                                <Link className="nav-link text-white" to="/admin/catelogys.html">
                                    <i className="fas fa-fw fa-table" />
                                    <span>Doanh mục sản phẩm</span></Link>
                            </li>
                            <div className="gachtrang" />
                            <li className="nav-item item-con">
                                <Link className="nav-link text-white" to="/admin/products.html">
                                    <i className="fas fa-fw fa-table" />
                                    <span>Tất cả sản phẩm</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li className="list-group-item nav-link btn btn-link ">
                        <Link className="text-white" to="/admin/orders.html">
                            <i className="fas fa-fw fa-chart-area" />
                            <span>Đơn hàng</span></Link>
                    </li>
                    {/* <li className="list-group-item nav-link btn btn-link"> */}
                    <li className="list-group-item nav-link  btn btn-link dropdown-toggle text-white" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span>Tài khoản</span>
                        <div className="dropdown-menu ml-auto" aria-labelledby="dropdownId">
                            <button onClick={() => this.clickOut()} className="dropdown-item">Đăng xuất</button>
                            <button className="dropdown-item">Thông tin</button>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default withRouter(NavAdmin)
