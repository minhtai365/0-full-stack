import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScreen from 'react-loading-screen';
import { Link, withRouter } from 'react-router-dom';
import Boxicon from '../layout/Boxicon';
import {to_slug,formatMoney} from '../layout/FormatSlug';
function Cart(props) {
    // const [dt, setdt] = useState([]);
    const [item, setitem] = useState([]);
    const [total, settotal] = useState(0);
    const [user, setuser] = useState([]);
    const [isload, setisload] = useState(true);
    function getDataCart() {
        Axios.post('/cart', {
            id: sessionStorage.getItem('userID')
        })
            .then(res => {
                var dtt = res.data;
                if (dtt.length !== 0) {
                    // var data = Object.assign({}, dtt)
                    var total = 0;
                    dtt.item.map(x => {
                        total = total + parseInt(x.price * x.qty);
                        return total
                    });
                    // setdt(dtt);
                    setitem(dtt.item);
                    settotal(total);
                    
                }
                else {
                    // setdt([]);
                    setitem([]);
                    settotal(0);
                }
                setisload(false)
            })
    }
    useEffect(() => {
        if (sessionStorage.getItem("userID") === null) {
            alert('Vui lòng đăng nhập');
            props.history.push('/login.html')
        }
        else {
            getDataCart();
            Axios.post('/user', {
                id: sessionStorage.getItem('userID')
            })
                .then(re => {
                    var dtt = re.data
                    setuser(dtt);
                })
                window.scrollTo(0, 0)
        }
    }, []);
    // function formatMoney(t) {
    //     return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // }
    function setQty(num, id){
        Axios.post('/cart/setqty', {
            num: num,
            userid: sessionStorage.getItem('userID'),
            productid: id
        })
            .then(re => {
                getDataCart();
            })

    }
    function onChose(e, id){
        Axios.post('/cart/setprice', {
            userid: sessionStorage.getItem('userID'),
            price: e.target.value,
            id: id
        })
            .then(re => {
                getDataCart();
            })

    }
    function remove(id){
        console.log(id);
        Axios.post('/cart/remove', {
            id: id,
            userid: sessionStorage.getItem('userID'),
        }).then(res=>{
            alert(res.data.mess);
            getDataCart();
        })
    }
    const isClick = (e) => {
        // e.preventDefault();
        const { name, phone, address, tp, quan, cmnd } = user

        if (name === undefined || phone === undefined || cmnd === undefined || tp === undefined ||
            address === undefined || quan === undefined) {

            alert('Vui lòng nhập thông tin liên hệ !!!')
            props.history.push('/properties.html')
        }
        else {
            Axios.post('/order/add', {
                userid: sessionStorage.getItem('userID'),
                item: item,
                name: name,
                phone: phone,
                address: address,
                tp: tp,
                quan: quan,
                cmnd: cmnd,
                total: total
            })
                .then(res => {
                    getDataCart();
                    alert(res.data.mess);
                })
        }
    }
    function formAll() {
        return item.map((y, k) =>

            <div key={k} className="shadow my-cart py-4 my-2">
                
                <div className="d-flex justify-content-between">

                <Link to={"/chi-tiet/" + to_slug(y.name) + "/" + y.productid + ".html"} >
                    <div className="row order-content pb-5">

                            <div className="px-4 ">
                                <img className="ml-4" src={y.img} alt="Hình" width='60' />
                                
                            </div>
                            <div className="px-md-4 text-order py-lg-3">
                                <div className="h4 name-pro">{y.name}</div>
                                <div className="text-left text-danger">x {formatMoney(y.price)} VND    </div>
                            </div>

                    </div>

                    </Link>
                    <div className="px-4 order-type my-row py-lg-3">
                         
                        <div className="form-group sl">
                            <select onChange={(e, id) => onChose(e, y.productid)}
                                className="form-control" defaultValue={y.typeorder} name="typeorder">
                                {/* <option value='1'>Mua</option> */}
                                <option value='0.3'>1 Ngày</option>
                                <option value='0.5'>3 Ngày</option>
                                <option value='0.7'>7 Ngày</option>
                            </select>
                        </div>
                        
                        <div className="form-group sl">
                            <span onClick={() => setQty(-1, y.productid)} className="triangle triangle--left"></span>
                            <span className="input-group-text value">{y.qty}</span>
                            <span onClick={() => setQty(1, y.productid)} className="triangle triangle--right"></span>
                        </div>
                        <div className="text-danger sl"> {formatMoney(y.price)} VND</div>
                    </div>
                </div>
                
                <button className="btn btn-danger" onClick={()=>remove(y.productid)}>Xóa</button>
            </div>
        )
    }
        return (
            <LoadingScreen
                loading={isload}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                logoSrc='/logo.png'
                text='Loading.............'
            >
            <div >
                {/* <Header /> */}
                <div className="container-md content-chitiet">
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
                                {formAll()}
                               
                            {/* </div> */}
                            <div className="d-flex justify-content-between">
                                <div className="text-left flex-column ">
                                    <div><label>Tên: {user.name} </label></div>
                                    <div><label>SĐT: {user.phone} </label></div>
                                    <div><label>Email: {user.email} </label></div>
                                    <div><label>CMND: {user.cmnd} </label></div>
                                    <div><label>Số nhà: {user.address} </label></div>
                                    <div><label>Quận/Huyện: {user.quan} </label></div>
                                    <div><label>Thành Phố/Tỉnh: {user.tp} </label></div>
                                    <div><Link to="/properties.html" className="btn btn-primary" >Sửa</Link></div>
                                </div>


                                <div className="text-right">
                                    <div className="text-danger">Thành tiền     :   {formatMoney(total)} VNĐ</div>
                                    <div>Nếu bạn không đến shop trong vòng 24h tới để thuê sản phẩm hệ thống sẽ tự động hủy đơn hàng của bạn</div>
                                    <div className="">
                                        <button onClick={(e) => isClick(e)} className="btn btn-danger" >Đặt hàng</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <hr />
                <Boxicon />
                {/* <Footer /> */}
            </div>
            </LoadingScreen>
        )
    }
export default withRouter(Cart)
