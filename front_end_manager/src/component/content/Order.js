import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import {to_slug,formatMoney} from '../layout/FormatSlug';
function Order(props) {
    const [type, settype] = useState(5);
    const [dt, setDt] = useState([]);
    
    const history=useHistory();
    
    function getdt(){  Axios.post('/order', {
        id: sessionStorage.getItem('userID')
    })
        .then(res => {
            var dt = res.data;
            setDt(dt)
        });
    }
    useEffect(() => {
        if (sessionStorage.getItem('userID') === null) {
            alert('Vui lòng đăng nhập !!!')
            history.push('/login.html')
            // props.history.push('/login.html')
        }else{
            getdt();
        }
      
        window.scrollTo(0, 0);
       
    }, []);
    const clickCancel = (id, item) => {
        Axios.post("/order/cancel", {
            userid:sessionStorage.getItem('userID'),
            id: id,
            item: item
        })
            .then(res => {
                alert('ok');
                var dt = res.data;
                setDt(dt)
            })
    }
    
    // const clickAddCart = (item) => {
    //     Axios.post('/cart/again', {
    //         item: item,
    //         userid: sessionStorage.getItem('userID')
    //     })
    //         .then(res => {
    //             alert(res.data.mess);
    //         })
    // }
 
    function formAll() {
        var dtt;
        if(type!==5){

            dtt=dt.filter(x=>x.status===type);
        }
        else{
           dtt=dt;
        }
        if(dtt.length===0){
            return <img src="/emty.svg" height="300" width="100%" alt="Hình"/>
        }
else{
        return dt.map((x, key) =>
            <div key={key} className="bg-white shadow item rounded">
                <div className="d-flex justify-content-between">
                {x.dateca!==undefined?<div className=" pl-4">Ngày hủy :<div className="text-danger ">{x.datecan}</div></div>:
                x.datecom!==undefined?<div className=" pl-4">Ngày bàn giao :<div className="text-danger ">{x.datecom}</div></div>:
                x.dateget!==undefined?<div className=" pl-4">Ngày nhận :<div className="text-danger ">{x.dateget}</div></div>:
                <div className=" pl-4">Ngày đặt :<div className="text-danger ">{x.datelc}</div></div>
            }
                    
                    <div className="pr-3">Trạng thái :<div className="text-danger pl-1">{x.status === 1 ? "Chờ nhận" : x.status === 2 ? 'Đã nhận' :
                        x.status === 3 ? 'Đã bàn giao' : x.status === 4 ? 'Hoàn thành' : 'Đã hủy'} </div></div>
                </div>

                {x.item.map((y, k) =>
                    <Link to={"/chi-tiet/" + to_slug(y.name) + "/" + y.productid + ".html"} className={"tabs tab-"+k} key={k}>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <div className="row order-content">
                                <div className="px-4">
                                    <img className="ml-4" src={y.img} alt="Hình" width='60' />
                                </div>
                                <div className="px-md-4 text-order py-lg-3">
                                    <div className="h4 name-pro">{y.name}</div>
                                    <div>x {y.qty}</div>
                                </div>
                            </div>
                            <div className="px-4 order-type py-lg-3">
                                {y.typeorder === '1' ?
                                    <div>Mua</div> : y.typeorder === '0.7' ?
                                        <div>Thuê 7 ngày</div> : y.typeorder === '0.5' ?
                                            <div>Thuê 3 ngày</div> : <div>Thuê 1 ngày</div>}
                                <div> {formatMoney(y.price)} VND</div>
                            </div>
                        </div>
                        <hr />
                    </Link>
                )}
                <div className="d-flex justify-content-end">
                    Tổng số tiền :<div className="text-danger px-3 font-weight-bold"> {formatMoney(x.total)} VND</div>
                </div>
                <div className="d-flex justify-content-end">
                    {x.status === 1 && <button type="button" onClick={() => clickCancel(x._id, x.item)} className="btn btn-danger">Hủy</button>}
                    {/* {x.status === 0 && <button type="button" onClick={() => clickAddCart(x.item)} className="btn btn-danger">Thêm giỏ hàng</button>} */}
                    {/* {x.status === 3 && <button type="button" onClick={() => clickComplete(x._id)} className="btn btn-primary">Xác nhận đã nhận được hàng</button>} */}
                    {/* <button type="button" className="btn btn-primary">Đã nhận</button> */}
                </div>

                <hr />
            </div>

        )
    }
    }
   const changeType=(id)=>{
       settype(id)
    }
    
        return (
            <div >
                {/* <Header  /> */}
                <div  className="content-chitiet">

                </div>
                <div className="pt-1">

                </div>
                {/* <Boxicon /> */}
                <div className="container-md">
                    <hr />

                    <div className="d-flex justify-content-around bg-white shadow py-3 mb-5">
                        <div className="form-check-inline br">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>changeType(5)} className="form-check-input d-none  typeshow " name="typeshow" />                                <div className="typetext">Tất cả</div>
    </label>
                        </div>
                        <div className="form-check-inline br">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>changeType(1)} className="form-check-input d-none  typeshow" name="typeshow" />
                                <div className="typetext">Chờ bạn đến nhận</div>
    </label>
                        </div>
                        <div className="form-check-inline br">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>changeType(2)} className="form-check-input d-none  typeshow" name="typeshow" />
                                <div className="typetext">Đã nhận</div>
    </label>
                        </div>
                        <div className="form-check-inline br">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>changeType(3)} className="form-check-input d-none  typeshow" name="typeshow" />
                                <div className="typetext">Đã bàn giao</div>
    </label>
                        </div>
                        <div className="form-check-inline br">
                            <label className="form-check-label">
                                <input type="radio" onChange={()=>changeType(0)} className="form-check-input d-none  typeshow" name="typeshow" />
                                <div className="typetext">Đã hủy</div>
    </label>
                        </div>
                    </div>

                    {formAll()}

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
                {/* <Footer /> */}

            </div>
        )
    }
export default withRouter(Order)