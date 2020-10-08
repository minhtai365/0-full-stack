import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
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
                <div className="jumbotron jumbotron-fluid content-chitiet">
                    <div className="container mt-5 pt-5">

                        <h5 className="display-3 text-center">Kết quả tìm kiếm</h5>
                        <hr className="my-2" />
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {this.props.dataproducts.filter(y => y.title.toLowerCase().indexOf(this.props.search) !== -1).map((x, key) =>
                            <div key={key} className="col-lg-3 col-md-6 col-12 mt-3">
                                <div className="card" style={{ height: '100%' }}>
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
                        )}

                    </div>
                </div>
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
        search: state.search
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