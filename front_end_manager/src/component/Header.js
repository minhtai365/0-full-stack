import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
// withRouter(
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datatypes: [],
            datacatelogys: [],
            dataproducts: [],
            search: ''
        }
    }
    componentWillMount() {
        Axios.get('/products')
            .then(res => {
                if (this.props.dataproducts.length === 0) {
                    this.setState({
                        dataproducts: res.data
                    })
                    this.props.sendProducts(res.data);
                }
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
    sendIDCate = (id) => {

        this.props.clickItem(id);
        // this.props.history.push('/index.html');
    }
    to_slug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }
    inputValue = (e) => {
        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.search);
    }
    clickSearch() {
        // console.log(this.state.search);
        this.props.search("sơ");
    }
    render() {
        return (


            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="fixed-top top-nav">
                    <div className="container  pt-2">
                        <div className="d-flex justify-content-start">
                            <div className="link-a mx-2" ><i className="fa fa-map-marker mx-2" aria-hidden="true" /> Liên hệ</div>
                            <div className="link-a mx-2" href="callto:0352268668"><i className="fa fa-phone mx-2" aria-hidden="true" />
          0352268668</div>
                            <a className="link-a mx-2" href="mailto:tranminhtai365@gmail.com"><i className="fa fa-envelope mx-2" aria-hidden="true" />
          tranminhtai365@gmail.com</a>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Link className="link-a mx-2" to="/login.html"><i className="fa fa-user" aria-hidden="true" />{this.props.name}</Link>
                            <Link className="link-a mx-2" to="/cart.html"> <span>Giỏ hàng của tôi</span></Link>
                        </div>
                    </div>
                </div>
                <div className="container bottom-nav">
                    <div className="navbar-brand" ><i className="fa fa-user icon-logo" aria-hidden="true" /></div>
                    <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="list-group-item nav-link btn btn-link">
                                <Link className="nav-link" to="/index">Trang chủ</Link>
                            </li>
                            {this.state.datatypes.map((x, key) => {
                                return (
                                    <li key={key} className="list-group-item nav-link btn btn-link "><Link to="/index" className="nav-link" >{x.typename}</Link>

                                        <ul className="list-group item-title list-sub position-absolute">
                                            {this.state.datacatelogys.filter(y => y.typeid === x._id).map((z, key) => {
                                                return (<li key={key} className="list-group-item nav-link"><Link  to={"/index/" + this.to_slug(z.catelogy) + "/" + z._id + ".html"}
                                                    onClick={() => this.sendIDCate(z._id)}>{z.catelogy}</Link>
                                                </li>)
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                            {/* <li key={key} className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id={x._id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{x.typename}</div>
                                <div className="dropdown-menu" aria-labelledby={x.id}>
                                    {this.state.datacatelogys.filter(y => y.typeid === x._id).map((z, key) => {
                                        return (<Link key={key} to={"/index/" + this.to_slug(z.catelogy) + "/" + z._id + ".html"}
                                            className="dropdown-item" onClick={() => this.sendIDCate(z._id)}>{z.catelogy}</Link>)
                                    })}
                                </div>
                            </li> */}

                            <li className="list-group-item nav-link btn btn-link ">
                                <Link to="/index" className="nav-link " >Bảng giá</Link>
                            </li>
                            <li className="list-group-item nav-link btn btn-link ">
                                <Link to="/index" className="nav-link " >Hướng dẫn dịch vụ</Link>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2 botron30" name="search" onChange={(e) => this.inputValue(e)} type="text" placeholder="Search" />
                            <button className="btn btn-outline-primary botron30 my-2 my-sm-0" onClick={() => this.props.search(this.state.search)}>Search</button>
                        </div>
                    </div>
                </div>
            </nav>

        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        dataproducts: state.dataproducts
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
        },
        search: (data) => {
            dispatch({ type: 'GET_DATA_SEARCH', data })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
