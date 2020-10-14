import Axios from 'axios'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Boxicon from '../layout/Boxicon';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dt: [],
            item: [],
            total: 0,
            user: []
        }
    }
    getDataCart() {
        Axios.get('/cart')
            .then(res => {
                var dt = res.data.filter(x => x.userid === sessionStorage.getItem("userID"));
                if (dt.length !== 0) {
                    // var data = Object.assign({}, dt)
                    var total = 0;
                    dt[0].item.map(x => {
                        total = total + parseInt(x.price * x.qty);
                        return total
                    });
                    this.setState({
                        dt: dt[0],
                        item: dt[0].item,
                        total: total
                    })
                }
                else {
                    this.setState({
                        dt: [],
                        item: [],
                        total: 0
                    })
                }
            })
    }
    componentWillMount() {
        if (sessionStorage.getItem("userID") === null) {
            alert('Vui lòng đăng nhập');
            this.props.history.push('/index')
        }
        else {
            this.getDataCart();
            Axios.get('/user')
                .then(re => {
                    var dt = re.data.filter(x => x._id === sessionStorage.getItem('userID'));
                    this.setState({
                        user: dt[0]
                    })
                })
        }

    }
    formatMoney(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    setQty = (num, id) => {
        Axios.post('/cart/setqty', {
            num: num,
            userid: sessionStorage.getItem('userID'),
            productid: id
        })
            .then(re => {
                this.getDataCart();
            })

    }
    onChose = (e, id) => {
        Axios.post('/cart/setprice', {
            userid: sessionStorage.getItem('userID'),
            price: e.target.value,
            id: id
        })
            .then(re => {
                this.getDataCart();
            })

    }
    remove = (id) => {
        Axios.post('/cart/remove', {
            id: id,
            userid: sessionStorage.getItem('userID'),
        })
        this.getDataCart();
    }
    ischange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    isClick = (e) => {
        // e.preventDefault();
        const { name, phone, address, tp, quan, cmnd } = this.state.user

        if (name === undefined || phone === undefined || cmnd === undefined || tp === undefined ||
            address === undefined || quan === undefined) {

            alert('Vui lòng nhập thông tin liên hệ !!!')
            this.props.history.push('/properties.html')
        }
        else {
            Axios.post('/order/add', {
                userid: sessionStorage.getItem('userID'),
                item: this.state.item,
                name: name,
                phone: phone,
                address: address,
                tp: tp,
                quan: quan,
                cmnd: cmnd,
                total: this.state.total
            })
                .then(res => {
                    this.getDataCart();
                    alert(res.data.mess);
                })
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    formAll() {
        return this.state.item.map((y, k) =>

            <div key={k} className="shadow my-cart py-4 my-2">
                
                <div className="d-flex justify-content-between">

                <Link to={"/chi-tiet/" + this.to_slug(y.name) + "/" + y.productid + ".html"} >
                    <div className="row order-content pb-5">

                            <div className="px-4 ">
                                <img className="ml-4" src={y.img} alt="Hình" width='60' />
                                
                            </div>
                            <div className="px-md-4 text-order py-lg-3">
                                <div className="h4 name-pro">{y.name}</div>
                                <div className="text-left text-danger">x {this.formatMoney(y.price)} VND    </div>
                            </div>

                    </div>

                    </Link>
                    <div className="px-4 order-type my-row py-lg-3">
                         
                        <div className="form-group sl">
                            <select onChange={(e, id) => this.onChose(e, y.productid)}
                                className="form-control" defaultValue={y.typeorder} name="typeorder">
                                {/* <option value='1'>Mua</option> */}
                                <option value='0.3'>1 Ngày</option>
                                <option value='0.5'>3 Ngày</option>
                                <option value='0.7'>7 Ngày</option>
                            </select>
                        </div>
                        
                        <div className="form-group sl"><span onClick={() => this.setQty(-1, y.productid)} className="triangle triangle--left"></span>
                                    <span className="input-group-text value">{y.qty}</span>
                                    <span onClick={() => this.setQty(1, y.productid)} className="triangle triangle--right"></span></div>
                        <div className="text-danger sl"> {this.formatMoney(y.price)} VND</div>
                    </div>
                </div>
                
            </div>
        )
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
    render() {
        return (
            <div >
                <Header />
                <div className=" content-chitiet">
                    <div className="d-flex mb-4">
                        <li className="list-ds"><Link to="/index">Trang chủ &gt;</Link></li>
                        <li className="list-ds" aria-current="page">GIỎ HÀNG</li>
                    </div>
                    <div className="text-center ">
                        <div className="container-sm">
                            <h4>Giỏ hàng</h4>
                            <div className="d-flex justify-content-center">
                                <div className="item-giohang">Trợ giúp : 0352268668</div>
                                <div className="item-giohang">Chính sách đổi trả </div>
                                <div className="item-giohang">Chính sách giao hàng </div>
                                <div className="pl-2">Chính sách thanh toán </div>
                            </div>
                            <hr />
                            {/* <div className="table-responsive-sm"> */}
                                {this.formAll()}
                               
                            {/* </div> */}
                            <div className="d-flex justify-content-between">
                                <div className="text-left flex-column ">
                                    <div><label>Tên: {this.state.user.name} </label></div>
                                    <div><label>SĐT: {this.state.user.phone} </label></div>
                                    <div><label>Email: {this.state.user.email} </label></div>
                                    <div><label>CMND: {this.state.user.cmnd} </label></div>
                                    <div><label>Số nhà: {this.state.user.address} </label></div>
                                    <div><label>Quận/Huyện: {this.state.user.quan} </label></div>
                                    <div><label>Thành Phố/Tỉnh: {this.state.user.tp} </label></div>
                                    <div><Link to="/properties.html" className="btn btn-primary" >Sửa</Link></div>
                                </div>


                                <div className="text-right">
                                    <div className="text-danger">Thành tiền     :   {this.formatMoney(this.state.total)} VNĐ</div>
                                    <div>Nếu bạn không đến shop trong vòng 24h tới để thuê sản phẩm hệ thống sẽ tự động hủy đơn hàng của bạn</div>
                                    <div className="">
                                        <button onClick={(e) => this.isClick(e)} className="btn btn-danger" >Đặt hàng</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <hr />
                <Boxicon />
                <Footer />
            </div>
        )
    }
}
export default withRouter(Cart)
