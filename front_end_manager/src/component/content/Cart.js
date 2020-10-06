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
                else{
                    this.setState({
                        dt:[],
                        item:[],
                        total:0
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
    render() {
        return (
            <div>
                <Header />
                <div className="container content-chitiet">
                    <div className="d-flex mb-4">
                        <li className="list-ds"><Link to="/index">Trang chủ &gt;</Link></li>
                        <li className="list-ds" aria-current="page">GIỎ HÀNG</li>
                    </div>
                    <div className="text-center ">
                        <div className="container">
                            <h4>Giỏ hàng</h4>
                            <div className="d-flex justify-content-center">
                                <div className="item-giohang">Trợ giúp : 0352268668</div>
                                <div className="item-giohang">Chính sách đổi trả </div>
                                <div className="item-giohang">Chính sách giao hàng </div>
                                <div className="pl-2">Chính sách thanh toán </div>
                            </div>
                            <hr />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th />
                                        <th>Sản phẩm</th>
                                        <th>Đơn giá</th>
                                        <th>Số lượng</th>
                                        <th>Mua/Thuê</th>
                                        <th>Thành tiền</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>

            {this.state.item.map((x, key) =>
                <tr key={key} >
                    <td><img src={x.img} width='50' alt="Hình" /></td>
                    <td>{x.name}</td>
                    <td>{this.formatMoney(x.price)} VND</td>
                    <td><div onClick={() => this.setQty(-1, x.productid)} className="triangle triangle--left"></div>
                        <div className="input-group-text value">{x.qty}</div>
                        <div onClick={() => this.setQty(1, x.productid)} className="triangle triangle--right"></div></td>
                    <td><div className="form-group">
                        <select onChange={(e, id) => this.onChose(e, x.productid, x.price)} 
                        className="form-control" defaultValue={x.typeorder} name="typeorder">
                            <option value='1'>Mua</option>
                            <option value='0.3'>1 Ngày</option>
                            <option value='0.5'>3 Ngày</option>
                            <option value='0.7'>7 Ngày</option>
                        </select>
                    </div></td>
                    {this.state.id !== x._id ? <td>{this.formatMoney(parseInt(x.price * x.qty))}  VNĐ</td> :
                        <td>{this.formatMoney(parseInt(x.qty * this.state.price))}  VNĐ</td>}
                    <td>  <div className="text-danger" onClick={(id) => this.remove(x.productid)} >
                        <i className="far fa-times-circle"></i>
                        </div></td>
                    {/* {x.buy === '0' ? <td>Mua</td> : <td>{x.buy}</td>} */}
                </tr>
            )}
                                </tbody>
                            </table>

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
                                    <div>Thành tiền     :   {this.formatMoney(this.state.total)} VNĐ</div>
                                    <div className="">
                                        <button onClick={(e) => this.isClick(e)} className="btn btn-primary" >Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
    {/* <div className="row">
        <div className="col-md-4 col-12">
            <div className="form-group ">
                <label >Tên</label>
                <input type="text"
                    className="form-control" onChange={(e) => this.ischange(e)}
                        required name="name" defaultValue={this.state.user.name } />
            </div>

            <div className="form-group ">
                <label >Địa chỉ</label>
                <input type="text"
                    className="form-control" onChange={(e) => this.ischange(e)} required name="address" placeholder="" />
            </div>
        </div>
        <div className="col-md-4 col-12">
            <div className="form-group">
                <label >Số điện thoại</label>
                <input type="text"
                    className="form-control" onChange={(e) => this.ischange(e)} required name="phone" placeholder="" />
            </div>
            <div className="form-group">
                <label >Quận/Huyện</label>
                <input type="text"
                    className="form-control" onChange={(e) => this.ischange(e)} required name="quan" placeholder="" />
            </div>
        </div>
        <div className="col-md-4 col-12">
            <div className="form-group">
                <label >Số CMND</label>
                <input type="id"
                    className="form-control" onChange={(e) => this.ischange(e)} required name="cmnd" placeholder="" />
            </div>
            <div className="form-group">
                <label >Thành phố/Tỉnh</label>
                <input type="text"
                    className="form-control" onChange={(e) => this.ischange(e)} required name="tp" placeholder="" />
            </div>
        </div>
    </div>
    */}
    {/* </form> */}
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
