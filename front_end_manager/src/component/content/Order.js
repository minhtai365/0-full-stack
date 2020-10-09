import Axios from 'axios';
import React, { Component } from 'react'
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Footer from '../layout/Footer'
import Header from '../layout/Header'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dt: [],
            type:5
        }
    }

    formatMoney(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    componentWillMount() {
        if (sessionStorage.getItem('userID') === null) {
            alert('Vui lòng đăng nhập !!!')
            this.props.history.push('/index')
        }
        Axios.get('/order')
            .then(res => {
                var dt = res.data.filter(x => x.userid === sessionStorage.getItem('userID'));
                console.log(dt);
                this.setState({
                    dt: dt
                })
            })
    }
    clickCancel = (id, item) => {
        Axios.post("/order/cancel", {
            id: id,
            item: item
        })
            .then(res => {
                alert(res.data.mess);
                Axios.get('/order')
                    .then(res => {
                        var dt = res.data.filter(x => x.userid === sessionStorage.getItem('userID'));
                        console.log(dt);
                        this.setState({
                            dt: dt
                        })

                    })
            })
    }
    
    clickAddCart = (item) => {
        Axios.post('/cart/again', {
            item: item,
            userid: sessionStorage.getItem('userID')
        })
            .then(res => {
                alert(res.data.mess);
            })
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
    formAll() {
        
        if(this.state.type!==5){

            var dt=this.state.dt.filter(x=>x.status===this.state.type);
        }
        else{
           var dt=this.state.dt;
        }
        if(dt.length===0){
            return <img src="/emty.svg" height="300" alt="Hình"/>
        }
else{
        return dt.map((x, key) =>
            <div key={key} className="bg-white shadow rounded">
                <div className="d-flex justify-content-between">
                {x.dateca!==undefined?<div className=" pl-4">Ngày hủy :<span className="text-danger px-3">{x.datecan}</span></div>:
                x.datecom!==undefined?<div className=" pl-4">Ngày bàn giao :<span className="text-danger px-3">{x.datecom}</span></div>:
                x.dateget!==undefined?<div className=" pl-4">Ngày nhận :<span className="text-danger px-3">{x.dateget}</span></div>:
                <div className=" pl-4">Ngày đặt :<span className="text-danger px-3">{x.datelc}</span></div>
            }
                    
                    <div>Trạng thái :<span className="text-danger px-3">{x.status === 1 ? "Chờ nhận" : x.status === 2 ? 'Đã nhận' :
                        x.status === 3 ? 'Đã bàn giao' : x.status === 4 ? 'Hoàn thành' : 'Đã hủy'} </span></div>
                </div>

                {x.item.map((y, k) =>
                    <Link to={"/chi-tiet/" + this.to_slug(y.name) + "/" + y.productid + ".html"} key={k}>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <div className="row">
                                <div className="px-4">
                                    <img className="ml-4" src={y.img} alt="Hình" width='60' />
                                </div>
                                <div className="px-4 py-3">
                                    <div className="h4">{y.name}</div>
                                    <div>x {y.qty}</div>
                                </div>
                            </div>
                            <div className="p-4">
                                {y.typeorder === '1' ?
                                    <div>Mua</div> : y.typeorder === '0.7' ?
                                        <div>Thuê 7 ngày</div> : y.typeorder === '0.5' ?
                                            <div>Thuê 3 ngày</div> : <div>Thuê 1 ngày</div>}
                                <div> {this.formatMoney(y.price)} VND</div>
                            </div>
                        </div>
                        <hr />
                    </Link>
                )}
                <div className="d-flex justify-content-end">
                    Tổng số tiền :<h4 className="text-danger px-3"> {this.formatMoney(x.total)} VND</h4>
                </div>
                <div className="d-flex justify-content-end">
                    {x.status === 1 && <button type="button" onClick={() => this.clickCancel(x._id, x.item)} className="btn btn-danger">Hủy</button>}
                    {/* {x.status === 0 && <button type="button" onClick={() => this.clickAddCart(x.item)} className="btn btn-danger">Thêm giỏ hàng</button>} */}
                    {/* {x.status === 3 && <button type="button" onClick={() => this.clickComplete(x._id)} className="btn btn-primary">Xác nhận đã nhận được hàng</button>} */}
                    {/* <button type="button" className="btn btn-primary">Đã nhận</button> */}
                </div>

                <hr />
            </div>

        )
    }
    }
    changeType=(id)=>{
       this.setState({
           type:id
       })
    }
    render() {
        return (
            <div >
                <Header  />
                <div  className="content-chitiet">

                </div>
                <div className="pt-1">

                </div>
                {/* <Boxicon /> */}
                <div className="container">
                    <hr />

                    <div className="d-flex justify-content-around bg-white shadow p-3 mb-5">
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>this.changeType(5)} className="form-check-input d-none  typeshow " name="typeshow" />                                <div className="typetext">Tất cả</div>
    </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>this.changeType(1)} className="form-check-input d-none  typeshow" name="typeshow" />
                                <div className="typetext">Chờ bạn đến nhận</div>
    </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>this.changeType(2)} className="form-check-input d-none  typeshow" name="typeshow" />
                                <div className="typetext">Đã nhận</div>
    </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>this.changeType(3)} className="form-check-input d-none  typeshow" name="typeshow" />
                                <div className="typetext">Đã bàn giao</div>
    </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>this.changeType(0)} className="form-check-input d-none  typeshow" name="typeshow" />
                                <div className="typetext">Đã hủy</div>
    </label>
                        </div>
                    </div>

                    {this.formAll()}

                    {/* <div className="d-flex justify-content-around">
                        <Link to="/u/order">Tất cả</Link>
                        <Link to="/ok">Đang giao</Link>
                        <Link to="/u/order/type=3">Đã giao</Link>
                        <Link to="/u/order/type=4">Đã hủy</Link>
                    </div> */}
                    {/* <Switch>
                        <Route path="/u/order.html" exact>
                            <Redirect to="/u/order/type=1" />
                        </Route>
                        <Route path="/u/order/3" exact>
                            <contentOrder />
                        </Route>
                        <Route path="/ok">
                            <contentOrder />
                        </Route>
                        <Route path="/u/order">
                           
                        </Route>
                        <Route path="/u/order/type=4">
                            <div>Hello</div>
                        </Route>
                    </Switch> */}
                </div>
                <Footer />

            </div>
        )
    }
}
export default withRouter(Order)