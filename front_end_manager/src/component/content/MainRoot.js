import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getDt } from '../../reduxtoolkit/sliceReducer/dataSlice';
import Boxicon from '../layout/Boxicon';
import Carousel from '../layout/Carousel';
import {to_slug,formatMoney} from '../layout/FormatSlug';
// import { Pagination } from '@material-ui/lab';
import Pagination from './Pagination';
function MainRoot(props){
    const dispatch = useDispatch();
    const dt = useSelector(state => state.getdata.dt);
    const dataproducts = useSelector(state => state.getdata.dataproducts);
    const datacates = useSelector(state => state.getdata.datacates);
    const datatypes = useSelector(state => state.getdata.datatypes);
    const page = useSelector(state => state.getdata.page);
    const [typeview, settypeview] = useState('date');

    const dtt=[...dataproducts];
   
   

   const loadProducts=(id)=> {
        var mydt = [];
        var cate = datacates.filter(x => x.typeid === id);

        cate.forEach(cate => {
            dt.forEach(pro => {
                if (pro.catelogyid === cate._id) {
                    mydt.push(pro);
                }
            })
        });
        if (mydt.length === 0) {
            cate.forEach(cate => {
                dataproducts.forEach(pro => {
                    if (pro.catelogyid === cate._id) {
                        mydt.push(pro);
                    }
                })
            });
        }
        if (typeview === 'view') {
            mydt = mydt.sort((a, b) => b.view - a.view);
        }
        if (typeview === 'price') {
            mydt = mydt.sort((a, b) => a.sale - b.sale);
        }
        if (typeview === 'uprice') {
            mydt = mydt.sort((a, b) => b.sale - a.sale);
        }
        var pa = 6;
        var start = (page - 1) * pa;
        var end = page * pa;
        return mydt.slice(start, end).map((x, key) =>
            <div key={key} className="col-lg-4 col-sm-6 col-6 mt-3">
                
                <Link to={"/chi-tiet/" + to_slug(x.title) + "/" + x._id + ".html"}>
                <div className="shadow card-form card-slick">
                        <img className="img-zoom" src={x.imgPath} alt="" />
                        {/* </div> */}
                        <div className="card-body body-cart ">
                            <div className="title-cart ">{x.title}</div>
                            <strike className="card-text text-danger ">{formatMoney(x.price)} VND</strike>
                            <p className="card-text text-dark">{formatMoney(x.sale)} VND || Giảm {parseInt((x.price - x.sale) / x.price * 100)}%</p>
                        </div>
                </div>
                
                </Link>
            </div>
        )
    }
    const clickitem=(id)=>{
        dispatch(getDt(id));
    }
   const loadCates=(id)=> {
        var dt = datacates.filter(x => x.typeid === id);
        return (
            dt.map((y, key) =>
                <div key={key} className="form-check">
                    <label className="form-check-label">
                        <input type="radio" className="item-click form-check-input" name="optradio" />
                        <div key={key} className="dropdown-item item-bg border-left border-bottom"
                            onClick={()=>clickitem(y._id)} 
                            >{y.catelogy}
                            </div>
                    </label>
                </div>
            )
        )
    }
   const onChose = (e) => {
        settypeview(e.target.value)
    }
   
    // const handleChange = (event, value) => {
    //     // setState({
    //     //     page: value
    //     // })
    //     setpage(value);
    // }
    
        const settings = {
            dots: true,
            infinite: true,
            // adaptiveHeight:true,
            className: "slick-st",
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            // pauseOnHover: true,
            responsive: [
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1
                    }
                  },
            ]
        };
        return (
            <div>
                {/* <Header /> */}
                <Carousel />
                <hr />
                <Boxicon />
                <div className="jumbotron jumbotron-fluid mt-5">
                            <div className="container">
                                <div className="border-center"><span>Xem nhiều</span></div>
                                <hr className="my-2" />
                            </div>
                        </div>
                        
                <div className="container-md">
                <Slider {...settings}>
                    {dtt.sort((a, b) => a.view - b.view).slice(0-6).map((x,key)=>{
                        return <div key={key} className="col-md-10 col-12 ">
                        <Link to={"/chi-tiet/" + to_slug(x.title) + "/" + x._id + ".html"}>
                         <div className="shadow card-slick">
                                 <img className="img-zoom" src={x.imgPath} alt="" />
                                 <div className="card-body body-cart ">
                                     <div className="title-cart ">{x.title}</div>
                                     <strike className="card-text text-danger ">{formatMoney(x.price)} VND</strike>
                                     <p className="card-text text-dark">{formatMoney(x.sale)} VND</p>
                                 </div>
                         </div>
                             </Link>
                     </div>
                    })
                    }
                </Slider>
                </div>
                {datatypes.map((types, key) =>
                    <div id={types._id} key={key}>
                        <div className="jumbotron jumbotron-fluid mt-5">
                            <div className="container">
                                <div className="border-center"><span>{types.typename}</span></div>
                                <hr className="my-2" />
                            </div>
                        </div>

                        <div className="container-md">
                            <div className="col-3 " style={{ float: 'left' }}>

                                <select onChange={(e) => onChose(e)}
                                    className=" ml-md-4 mb-5" defaultValue={''} name="typeview">
                                    {/* <option value='1'>Mua</option> */}
                                    <option value='date'>Mới nhất</option>
                                    <option value='price'>Giá tăng dần</option>
                                    <option value='uprice'>Giá giảm dần</option>
                                    <option value='view'>Xem nhiều</option>
                                </select>
                                <div className="list-group my-sub">
                                    {loadCates(types._id)}
                                </div>
                            </div>
                            <div className="col-sm-9 col-12" style={{ float: 'right' }}>
                                <div className="row">
                                    {loadProducts(types._id)}
                                </div>
                            </div>
                        </div>
                        <div className="clearfix" />
                        {/* <div className="d-flex justify-end"> */}

                        <Box display="flex" justifyContent="flex-end">
                            {/* <Pagination count={parseInt(dataproducts.length/2)+1} page={page} onChange={handleChange} /> */}
                           <a href={'#'+types._id}> <Pagination id={types._id} /></a>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Typography>page:{page}</Typography>
                        </Box>
                    </div>
                )}
            </div>


        );
    }

export default MainRoot