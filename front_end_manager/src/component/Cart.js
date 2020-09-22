import Axios from 'axios'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dt: [],
            item: [],
            total:0,
            id:'',
            price:''
        }
    }

    componentWillMount() {
        if (sessionStorage.getItem("userID") === null) {
            alert('Vui lòng đăng nhập');
            this.props.history.push('/index')
        }
        else {
            Axios.get('/cartcustomer')
                .then(res => {
                    var dt = res.data.filter(x => x.userid === sessionStorage.getItem("userID"));
                    if (dt.length !== 0) {
                        var data = Object.assign({}, dt)
                        // console.log(data[0]);
                        var total=0;
                        data[0].item.map(x=>{
                            total=total + parseInt(x.price*x.qty)
                        })
                        this.setState({
                            dt: data[0],
                            item: data[0].item,
                            total:total,
                            
                        })

                    }

                })
        }
    }
    formatMoney(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    setQty=(num,id)=>{
            Axios.post('/setQty',{
                num:num,
                userid:sessionStorage.getItem('userID'),
                productid:id
            })
            Axios.get('/cartcustomer')
                .then(res => {
                    var dt = res.data.filter(x => x.userid === sessionStorage.getItem("userID"));
                    if (dt.length !== 0) {
                        var data = Object.assign({}, dt)
                        // console.log(data[0]);
                        var total=0;
                        data[0].item.map(x=>{
                            total=total + parseInt(x.price*x.qty)
                        })
                        this.setState({
                            dt: data[0],
                            item: data[0].item,
                            total:total,
                        })
                    }
                })
    }
    onChose = (e,id,price) => {
        Axios.post('/setPrice',{
            // userid:sessionStorage.getItem('userID'),
            price:parseInt(e.target.value*price),
            id:id
        })
        Axios.get('/cartcustomer')
        .then(res => {
            var dt = res.data.filter(x => x.userid === sessionStorage.getItem("userID"));
            if (dt.length !== 0) {
                var data = Object.assign({}, dt)
                // console.log(data[0]);
                var total=0;
                data[0].item.map(x=>{
                    total=total + parseInt(x.price*x.qty)
                })
                this.setState({
                    dt: data[0],
                    item: data[0].item,
                    total:total,
                })
            }
        })
    }
    render() {
        return (
            <div>
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
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.item.map((x, key) =>
                                        <tr key={key} >
                                            <td><img src={x.img} width='50' alt="Hình" /></td>
                                            <td>{x.name}</td>
                                            <td>{this.formatMoney(x.price)} VND</td>
                                            <td><div onClick={()=>this.setQty(-1,x.productid)} className="triangle triangle--left"></div>
                                                <div className="input-group-text value">{x.qty}</div>
                                                <div onClick={()=>this.setQty(1,x.productid)} className="triangle triangle--right"></div></td>
                                            <td><div className="form-group">
                                              <select onChange={(e,id)=>this.onChose(e,x._id,x.price)} className="form-control" defaultValue='1' name="typeorder">
                                                <option value='1'>Mua</option>
                                                <option value='0.25'>1 Ngày</option>
                                                <option value='0.5'>3 Ngày</option>
                                                <option value='0.7'>7 Ngày</option>
                                              </select>
                                            </div></td>
                                            {this.state.id!==x._id?<td>{this.formatMoney(parseInt(x.price*x.qty))}  VNĐ</td>:
                                            <td>{this.formatMoney(parseInt(x.qty*this.state.price))}  VNĐ</td>}
                                            {/* {x.buy === '0' ? <td>Mua</td> : <td>{x.buy}</td>} */}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end">
                                  <label className="btn btn-link">Thành tiền :</label>
                                <button className="btn btn-link">{this.formatMoney(this.state.total)} VNĐ</button>
                            </div>
                            <div className="d-flex justify-content-end">
                                
                                <button className="btn btn-primary">Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default withRouter(Cart)
