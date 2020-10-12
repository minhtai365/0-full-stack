import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Carousel from '../layout/Carousel';
import Boxicon from '../layout/Boxicon';
import { Typography, Box } from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';

import Pagination from './Pagination';
// const getproduct = () => axios.get('/products').then(res => res.data)
class MainRoot extends Component {
    constructor() {
        super();
        this.state = {
            types: [],
            typeview: 'date',

        }

    }

    // async function handleSearch() {
    //     const { data } = await axios.get(`/search/users?q=${keyword}`);
    //     console.log(data);
    // }
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
    formatMoney(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    loadProducts(id) {

        var mydt = [];

        // dt=[];
        var cate = this.props.datacates.filter(x => x.typeid === id);

        cate.forEach(cate => {
            this.props.dt.forEach(pro => {
                if (pro.catelogyid === cate._id) {
                    mydt.push(pro);
                }
            })
        });

        // if (this.props.search !== '') {
        //    mydt = mydt.filter(x => x.title.toLowerCase().indexOf(this.props.search) !== -1);
        // }
        if (mydt.length === 0) {
            cate.forEach(cate => {
                this.props.dataproducts.forEach(pro => {
                    if (pro.catelogyid === cate._id) {
                        mydt.push(pro);
                    }
                })
            });
        }
        if (this.state.typeview === 'view') {
            mydt = mydt.sort((a, b) => b.view - a.view);
        }
        if (this.state.typeview === 'price') {
            mydt = mydt.sort((a, b) => a.sale - b.sale);
        }
        if (this.state.typeview === 'uprice') {
            mydt = mydt.sort((a, b) => b.sale - a.sale);
        }
        // if (this.state.typeview === 'date') {
        //     mydt = mydt
        // }

        var pa = 6;
        var start = (this.props.page - 1) * pa;
        var end = this.props.page * pa;
        return mydt.slice(start, end).map((x, key) =>
            <div key={key} className="col-lg-4 col-md-6 col-12 mt-3">
                <div className="shadow card-form">
                    <Link to={"/chi-tiet/" + this.to_slug(x.title) + "/" + x._id + ".html"}>
                        {/* <div className="img-cart"> */}
                        {/* width="100%" height="100%" */}
                        <img className="img-zoom" src={x.imgPath} alt="" />
                        {/* </div> */}
                        <div className="card-body body-cart ">
                            <div className="title-cart ">{x.title}</div>
                            <strike className="card-text text-danger ">{this.formatMoney(x.price)} VND</strike>
                            <p className="card-text text-dark">{this.formatMoney(x.sale)} VND || Giảm {parseInt((x.price - x.sale) / x.price * 100)}%</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
    loadCates(id) {
        var dt = this.props.datacates.filter(x => x.typeid === id);
        return (

            dt.map((y, key) =>
                <div key={key} className="form-check">
                    <label className="form-check-label">
                        <input type="radio" className="item-click form-check-input" name="optradio" />
                        <div key={key} className="dropdown-item item-bg border-left border-bottom"
                            onClick={() => this.props.clickItem(y._id)} >{y.catelogy}</div>
                    </label>
                </div>
            )
        )
    }
    onChose = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    loadForm() {
        return (
            <div>
                {this.props.datatypes.map((types, key) =>
                    <div id={types._id} key={key}>
                        <div className="jumbotron jumbotron-fluid mt-5">
                            <div className="container">

                                <h5 className="display-3 text-center">{types.typename}</h5>
                                <hr className="my-2" />
                            </div>
                        </div>

                        <div className="container-md">
                            <div className="col-3 " style={{ float: 'left' }}>

                                <select onChange={(e) => this.onChose(e)}
                                    className="form-control ml-md-4 mb-5" defaultValue={''} name="typeview">
                                    {/* <option value='1'>Mua</option> */}
                                    <option value='date'>Mới nhất</option>
                                    <option value='price'>Giá tăng dần</option>
                                    <option value='uprice'>Giá giảm dần</option>
                                    <option value='view'>Xem nhiều</option>
                                </select>
                                <div className="list-group my-sub">
                                    {this.loadCates(types._id)}
                                </div>
                            </div>
                            <div className="col-sm-9 col-12" style={{ float: 'right' }}>
                                <div className="row">
                                    {this.loadProducts(types._id)}
                                </div>
                            </div>
                        </div>
                        <div className="clearfix" />
                        {/* <div className="d-flex justify-end"> */}

                        <Box display="flex" justifyContent="flex-end">
                            {/* <Pagination count={parseInt(this.props.dataproducts.length/2)+1} page={this.state.page} onChange={this.handleChange} /> */}
                           <a href={'#'+types._id}> <Pagination id={types._id} /></a>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Typography>page:{this.props.page}</Typography>
                        </Box>
                    </div>
                )}

            </div>
        );
    }
    handleChange = (event, value) => {
        // console.log(value);
        this.setState({
            page: value
        })
    }
    render() {
        return (
            <div>
                <Header />
                <Carousel />
                <hr />
                <Boxicon />
                {this.loadForm()}

                <Footer />
            </div>


        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        dt: state.dt,
        dataproducts: state.dataproducts,
        datacates: state.datacates,
        datatypes: state.datatypes,
        page: state.page
        // search: state.search
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clickItem: (id) => {
            dispatch({ type: 'GET_ID_CATELOGY', id: id })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainRoot)