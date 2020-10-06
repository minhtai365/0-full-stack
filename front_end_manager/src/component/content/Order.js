import Axios from 'axios';
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import Boxicon from '../layout/Boxicon'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import contentOrder from './contentOrder'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dt: []
        }
    }

    formatMoney(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    componentWillMount() {
        Axios.get('/order')
            .then(res => {
                var dt = res.data.filter(x => x.userid === sessionStorage.getItem('userID'));
                console.log(dt);
                this.setState({
                    dt: dt
                })
            })
    }
    render() {
        return (
            <div>
                <Header />
                <div className="mt-5 pt-5">

                </div>
                <div className="pt-5">

                </div>
                <Boxicon />
                <div className="container">
                    <hr />

                    {this.state.dt.map((x, key) =>
                        <div key={key} className="bg-white shadow rounded">
                            <div className="d-flex justify-content-between">
                                <div className="pl-4">Ngày đặt :<span className="text-danger px-3">{x.date}</span></div>
                                <div>Trạng thái :<span className="text-danger px-3">{x.status===1?"Chờ xác nhận":x.status===2?'Đang giao':
                                x.status===3?'Đã giao':'Đã hủy'} </span></div>
                            </div>

                            {x.item.map((y, k) => {
                                return <div key={k}>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <div className="row">
                                            <div className="p-4">
                                                <img className="ml-4" src={y.img} alt="Hình" width='60' />
                                            </div>
                                            <div className="p-4">
                                                <div>{y.name}</div>
                                                <div>x {y.qty}</div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            {y.typeorder==='1'?
                                            <div>Mua</div>:y.typeorder==='0.7'?
                                            <div>Thuê 7 ngày</div>:y.typeorder==='0.5'?
                                            <div>Thuê 3 ngày</div>:<div>Thuê 1 ngày</div>}
                                            <div> {this.formatMoney(y.price) } VND</div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            })}
                            <div className="d-flex justify-content-end">Tổng số tiền :<h4 className="text-danger px-3"> {this.formatMoney(x.total) } VND</h4></div>

                            <hr />
                        </div>
                    )}
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