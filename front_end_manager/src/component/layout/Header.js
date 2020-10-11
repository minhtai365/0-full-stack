import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import Headroom from 'react-headroom'

// import { rhythm } from 'utils/typography'
// withRouter(
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datatypes: [],
            datacatelogys: [],
            dataproducts: [],
            info: [],
            search: ''
        }

    }
    componentWillMount() {
        Axios.get('/info')
            .then(res => {
                this.setState({
                    info: res.data[0]
                })
                this.props.sendInfo(res.data[0]);
            })
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
    }
    clickSearch() {
        // console.log(this.state.search);
        this.props.search(this.state.search);
    }
    clickOut = () => {
        sessionStorage.removeItem("userID");
        sessionStorage.removeItem("username");
        this.props.history.push('/index');
    }
    find = (e) => {
        if (e.key === "Enter") {
            this.props.history.push('/index/search?search='+this.state.search)
            this.props.search(this.state.search)
        }
    }
    goLogin = (e) => {
        if (sessionStorage.getItem('userID') !== null) {
            e.preventDefault();
        }
    }
    render() {
        return (

            <Headroom
                // onPin={() => console.log('pinned')}
                // onUnpin={() => console.log('unpinned')}
                wrapperStyle={{ marginTop: '0' }}
                // upTolerance="100px"
                // downTolerance='100px'
                
                style={{
                    // marginTop: '-150px',
                    transition: 'all .5s ease-in-out'
                }}
            >
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <div className="fixed-top top-nav">
                        <div className="container-md pt-2 inf">
                            {/* <div className='con'> */}
                            
                            {/* <div className="d-flex flex-wrap justify-content-between"> */}
                            <div className="d-flex justify-content-center justify-content-lg-start con">
                                {/* <div className="link-a px-2 oka border-right" ><i className="fa fa-map-marker mx-2" aria-hidden="true" /> Liên hệ</div> */}
                                <div className="link-a px-2  border-right inf-lef" href={"callto:" + this.state.info.phone}><i className="fa fa-phone mx-2" aria-hidden="true" />
                                    {this.state.info.phone}</div>
                                <a className="link-a px-2 inf-lef" href={"mailto:" + this.state.info.email}><i className="fa fa-envelope mx-2" aria-hidden="true" />
                                    {this.state.info.email}</a>
                                {/* </div> */}
                            </div>
                            <div className="d-flex justify-content-center justify-content-md-end my-right con">
                                <div className="flex-column acc ">
                                    <Link className="link-a p-2 mr-2 border-right" onClick={(e) => this.goLogin(e)} to="/login.html">
                                        <i className="fa fa-user mx-2" aria-hidden="true" />
                                        {sessionStorage.getItem('username') !== null ? sessionStorage.getItem('username') : "Tài khoản"}</Link>
                                    {sessionStorage.getItem('userID') &&
                                        <Link to="/properties.html" className="link-a p-2 text-left logout">Thông tin</Link>}
                                    {sessionStorage.getItem('userID') &&
                                        <div onClick={() => this.clickOut()} className="link-a p-2 text-left logout">Đăng xuất</div>}

                                </div>
                                <Link className="link-a px-2 mr-2 border-right" to="/cart.html"> <i className="fas mx-2 fa-shopping-bag"></i>Giỏ hàng</Link>
                                <Link className="link-a mr-2" to="/u/order"> <i className="fas mx-2 fa-shipping-fast"></i>Đơn hàng</Link>
                            </div>
                            {/* </div> */}
                        </div>
                        <div className="center-nav">
                            <div className="d-flex container  justify-content-between">
                                <div className="content-left">
                                    {/* <div className="navbar-brand" >
                    ,rounded-right,rounded-bottom,rounded-left,,|rounded-top rounded-circle
                    <i className="fas fa-store icon-logo" aria-hidden="true" />
                </div> */}
                                    <div className="logo">
                                        Minh Tài <sup>MT</sup>
                                    </div>
                                </div>
                                <div className="content-right sea d-flex justify-content-end">
                                    <div className="form-inline p-1">

                                        {this.state.search === '' ? <Link className=" fas fa-search text-dark" to='/index/search' onClick={() => this.props.search(this.state.search)}></Link> : ''}

                                        <input className="form-control shadow-none mr-sm-2 border-0 fff" name="search" onKeyDown={this.find} onChange={(e) => this.inputValue(e)} type="text" placeholder="Nhập tên sản phẩm cần tìm ...." />

                                        {this.state.search !== '' ? <Link className=" fas fa-search text-dark" to='/index/search' onClick={() => this.props.search(this.state.search)}></Link> : ''}

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" bottom-nav ">
                            <div className="container">
                                <ul className=" row ml-auto">
                                    <div className="row">
                                        <li className="list-group-item nav-link btn btn-link">
                                            <Link className="nav-link nav-bd" to="/index">Trang chủ</Link>
                                        </li>
                                        {this.state.datatypes.map((x, key) => {
                                            return (
                                                <li key={key} className="list-group-item nav-link btn btn-link "><a href={'#' + x._id} className="nav-link nav-bd" >{x.typename}</a>

                                                    <ul className="list-group list-sub position-absolute">
                                                        {this.state.datacatelogys.filter(y => y.typeid === x._id).map((z, key) => {
                                                            return (<Link to={"/index/" + this.to_slug(z.catelogy) + "/" + z._id + ".html"}
                                                            onClick={() => this.sendIDCate(z._id)}>
                                                            <li key={key} className="list-group-item sub-item nav-link nav-bd">
                                                                 {z.catelogy}
                                                            </li></Link>)
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        })}

                                        <li className="list-group-item nav-link btn btn-link ">
                                            <Link to="/index" className="nav-link nav-bd " >Bảng giá</Link>
                                        </li>
                                        <li className="list-group-item nav-link btn btn-link ">
                                            <Link to="/index" className="nav-link nav-bd" >Hướng dẫn dịch vụ</Link>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>



                </nav>
            </Headroom>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        dataproducts: state.dataproducts,
        username: state.username
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
        sendInfo: (dt) => {
            dispatch({ type: 'GET_DATA_INFO', dt })
        },
        search: (data) => {
            dispatch({ type: 'GET_DATA_SEARCH', data })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
