import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { Typography, Box } from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';

import Pagination from './Pagination';
class ResultSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dt: []
        }
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
    formatMoney(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    getData() {
        var mydt = this.props.dataproducts.filter(x => x.title.toLowCase().indexOf(this.props.search) !== -1);
        this.setState({
            dt: mydt
        })
    }
    render() {
        return (
            <div>
                <Header/>
                <div id='topage'  className="jumbotron jumbotron-fluid content-chitiet">
                    <div className="container mt-5 pt-5">

                        <h5 className="display-3 text-center">Kết quả tìm kiếm</h5>
                        <hr className="my-2" />
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {this.props.dataproducts.filter(y =>
                         y.title.toLowerCase().indexOf(this.props.search) !== -1).slice((this.props.page - 1) * 6, this.props.page * 6).map((x, key) =>
                            <div key={key} className="col-lg-3 col-md-6 col-12 mt-3">
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
                        )}

                    </div>
                </div>
                <Box display="flex" justifyContent="flex-end">
                            {/* <Pagination count={parseInt(this.props.dataproducts.length/2)+1} page={this.state.page} onChange={this.handleChange} /> */}
                            <a href="#topage"> <Pagination id={'0'} /></a>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Typography>page:{this.props.page}</Typography>
                        </Box>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        dt: state.dt,
        dataproducts: state.dataproducts,
        datacates: state.datacates,
        datatypes: state.datatypes,
        search: state.search,
        page:state.page
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // clickItem: (id) => {
        //     dispatch({ type: 'GET_ID_CATELOGY', id: id })
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResultSearch)