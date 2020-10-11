import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Carousel from '../layout/Carousel';
import Boxicon from '../layout/Boxicon';
import { Typography, Box } from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';

import Pagination from './Pagination';
class MainFilter extends Component {
    constructor() {
        super();
        this.state = {
            dt: []
        }
        this.foc = React.createRef()
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
    loadTitle() {
        var dt = [];
        this.props.datacates.forEach(ca => {
            if (ca._id === this.props.match.params.id) {
                this.props.datatypes.forEach(ty => {
                    if (ty._id === ca.typeid) {
                        dt = ty
                    }
                })
            }
        });
        return <div>
            <div className="jumbotron jumbotron-fluid">
                <div ref={this.foc} className="container">

                    <h5 className="display-3 text-center">{dt.typename}</h5>
                    <hr className="my-2" />
                </div>
            </div>

            <div className="container">
                <div className="col-3" style={{ float: 'left' }}>
                    <div className="list-group ">
                        {this.props.datacates.filter(y => y.typeid === dt._id).map((x, key) => (
                            <button key={key} className="dropdown-item item-click border-left border-bottom"
                                onClick={() => this.props.clickItem(x._id)} >{x.catelogy}</button>))}

                    </div>
                </div>
            </div>
        </div>
    }
    loadProducts() {
        var mydt=this.props.dt;
        // if(this.props.search!==''){
        //     mydt=this.props.dt.filter(x => x.title.toLowerCase().indexOf(this.props.search) !== -1);
        // }
           var pa = 6;
        var start = (this.props.page - 1) * pa;
        var end = this.props.page * pa;
        return (
            mydt.slice(start, end).map((x, key) =>
                <div key={key} className="col-lg-4 col-md-6 col-12 mt-3">
                    <div className="card card-form" style={{ height: '100%' }}>
                        <Link to={"/chi-tiet/" + this.to_slug(x.title) + "/" + x._id + ".html"}>
                            <img className="card-img-top img-zoom" src={x.imgPath} alt="" />
                            <div className="card-body">
                                <h4 className="card-title">{x.title}</h4>
                                <strike className="card-text">{this.formatMoney(x.price)} VND</strike>
                                <p className="card-text text-danger">{this.formatMoney(x.sale)} VND || Giảm  {parseInt((x.price - x.sale) / x.price * 100)}%</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        )
    }
    componentDidMount() {
        window.scrollTo(0, this.foc.current.offsetTop)
      }
    
    render() {
        return (
            <div>
                <Header />
                <Carousel />
                <hr />
                <Boxicon  />
                {this.loadTitle()}
                <div  className="container">
                    <div className="col-9" style={{ float: 'right' }}>
                        <div className="row">
                            {this.loadProducts()}
                        </div>
                    </div>

                </div>
                <div className="clearfix" />
                <Box display="flex" justifyContent="flex-end">
                            {/* <Pagination count={parseInt(this.props.dataproducts.length/2)+1} page={this.state.page} onChange={this.handleChange} /> */}
                            <Pagination id={'1'} />
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Typography>page:{this.props.page}</Typography>
                        </Box>
                <Footer />
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        dt: state.dt,
        datacates: state.datacates,
        datatypes: state.datatypes,
        page: state.page
        // search:state.search
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clickItem: (id) => {
            dispatch({ type: 'GET_ID_CATELOGY', id: id })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainFilter)