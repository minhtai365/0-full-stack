import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Carousel from '../layout/Carousel';
import Boxicon from '../layout/Boxicon';
// const getproduct = () => axios.get('/products').then(res => res.data)
class MainRoot extends Component {
    constructor() {
        super();
        this.state = {
            types: []
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

        return mydt.map((x, key) =>
            <div key={key} className="col-lg-4 col-md-6 col-12 mt-3">
                <div className="card card-form" style={{ height: '100%' }}>
                    <Link to={"/chi-tiet/" + this.to_slug(x.title) + "/" + x._id + ".html"}>
                        <img className="card-img-top img-zoom" src={x.imgPath} alt="" />
                        <div className="card-body">
                            <h4 className="card-title">{x.title}</h4>
                            <strike className="card-text">{this.formatMoney(x.price)} VND</strike>
                            <p className="card-text text-danger">{this.formatMoney(x.sale)} VND || Giảm {parseInt(x.price - x.sale) / x.price * 100}%</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
    loadCates(id) {
        return (
            this.props.datacates.filter(x => x.typeid === id).map((y, key) =>
                <button key={key} className="dropdown-item border-left border-bottom"
                    onClick={() => this.props.clickItem(y._id)} >{y.catelogy}</button>)
        )
    }
    loadForm() {
        return (
            <div>
                {this.props.datatypes.map((types, key) =>
                    <div key={key}>
                        <div className="jumbotron jumbotron-fluid mt-5">
                            <div className="container">

                                <h5 className="display-3 text-center">{types.typename}</h5>
                                <hr className="my-2" />
                            </div>
                        </div>

                        <div className="container">
                            <div className="col-3" style={{ float: 'left' }}>
                                <div className="list-group ">
                                    {this.loadCates(types._id)}
                                </div>
                            </div>
                            <div className="col-9" style={{ float: 'right' }}>
                                <div className="row">
                                    {this.loadProducts(types._id)}
                                </div>
                            </div>
                        </div>
                        <div className="clearfix" />
                    </div>
                )}

            </div>
        );
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