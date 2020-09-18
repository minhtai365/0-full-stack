import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link,withRouter } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datatypes: [],
            datacatelogys: [],
            dataproducts: []
        }
    }
    componentWillMount() {
        Axios.get('/products')
        .then(res => {
            this.setState({
                dataproducts: res.data
            })
            this.props.sendProducts(res.data);
        })
        .catch(err => {
            console.log(err);
        })
        Axios.get('/catelogys')
            .then(res => {
                this.setState({
                    datacatelogys: res.data
                })
                this.props.sendCates(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        Axios.get('/types')
            .then(res => {
                this.setState({
                    datatypes: res.data
                })
                this.props.sendTypes(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    sendIDCate=(id)=>{
        this.props.clickItem(id);
        this.props.history.push('/index.html');
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="fixed-top top-nav">
                    <div className="container  pt-2">
                        <div className=" float-left">
                            <a className="link-a ml-2" ><i className="fa fa-map-marker" aria-hidden="true" /> Liên hệ</a>
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
                    <a className="navbar-brand" ><i className="fa fa-user icon-logo" aria-hidden="true" /></a>
                    <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link className="nav-link " to="/index.html">Trang chủ</Link>
                            </li>
                            {this.state.datatypes.map((x,key) => {
                                return (
                                    <li  key={key} className="nav-item dropdown">
                                        <a className="nav-link  dropdown-toggle" id={x._id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{x.typename}</a>
                                        <div className="dropdown-menu" aria-labelledby={x.id}>
                                            {this.state.datacatelogys.filter(y => y.typeid === x._id).map((z,key) => {
                                                return (<Link key={key} className="dropdown-item" onClick={() => this.sendIDCate(z._id)}>{z.catelogy}</Link>)
                                            })}
                                        </div>
                                    </li>
                                )
                            })}
                            <li className="nav-item active">
                                <a className="nav-link " >Bảng giá</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link " >Hướng dẫn dịch vụ</a>
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
const mapStateToProps = (state, ownProps) => {
    return {
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clickItem: (id) => {
            dispatch({ type: 'GET_ID_CATELOGY', id: id })
        },
        sendCates: (dt) => {
            dispatch({ type: 'GET_DATA_CATELOGYS', dt: dt })
        },
        sendTypes: (dt) => {
            dispatch({ type: 'GET_DATA_TYPES', dt: dt })
        },
        sendProducts: (data) => {
            dispatch({ type: 'GET_DATA_PRODUCTS', data })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
