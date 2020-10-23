import Axios from 'axios';
import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import Headroom from 'react-headroom';

import LoadingScreen from 'react-loading-screen'
import { Button, MenuItem, Menu } from '@material-ui/core';
import { getCates, getDt, getInfo, getProducts, getSearch, getSlides, getTypes } from '../../reduxtoolkit/sliceReducer/dataSlice';

function Header(props){
    const [isload,setisload] = useState(true)
    const [search,setsearch] = useState(null)
    const [ishowAcc,setishowAcc] = useState(false)
    const [ishow,setishow] = useState(false)
    const dispatch = useDispatch();
    const datatypes = useSelector(state => state.getdata.datatypes);
    const dataproducts = useSelector(state => state.getdata.dataproducts);
    const datacates = useSelector(state => state.getdata.datacates);
    const info = useSelector(state => state.getdata.info)
    function handleClick(event){
        setishow(event.currentTarget)
    };
    function handleClickShow(event){
        setishowAcc(event.currentTarget)
    };

   function handleClose(){
    setishow(null);
    setishowAcc(null);
    };
    useEffect(() => {
        if(datatypes.length===0){
            Axios.get('/info')
            .then(res => {
               dispatch(getInfo(res.data[0]));
            })
         Axios.get('/types')
            .then(res => {
               dispatch(getTypes(res.data));
            }) 
            Axios.get('/imgslide')
            .then(res => {
               dispatch(getSlides(res.data));
                setisload(false)
            })         
        }
        if(dataproducts.length===0){
            Axios.get('/products')
            .then(res => {
               dispatch(getProducts(res.data));
                
            })
            Axios.get('/catelogys')
            .then(res => {
               dispatch(getCates(res.data));
                setisload(false)
            })
           
         }
        else{
            setisload(false)
        }
    }, [])
    const sendIDCate = (id) => {
        dispatch(getDt(id));
    }
    function to_slug(str) {
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
    function inputValue(e){
        // console.log(e.target.value);
        setsearch(e.target.value)
    }
    function clickSearch() {
        // console.log(this.state.search);
        dispatch(getSearch(search));
    }
   function clickOut(){
        sessionStorage.removeItem("userID");
        sessionStorage.removeItem("username");
        props.history.push('/login.html');
    }
    function find(e){
        if (e.key === "Enter") {
            props.history.push('/index/search?search=' +search)
            dispatch(getSearch(search))
        }
    }
    function goLogin(e){
        if (sessionStorage.getItem('userID') !== null) {
            e.preventDefault();
        }
    }
        const {location: {pathname}} = props;
        if (pathname.slice(1,6) ==='admin') {
            return null
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
                <Headroom
                    // onPin={() => console.log('pinned')}
                    // onUnpin={() => console.log('unpinned')}
                    wrapperStyle={{ marginTop: '0' }}
                    // upTolerance="100px"
                    // downTolerance='100px'

                    style={{
                        // marginTop: '-150px',
                        transition: 'all .5s ease-in-out'
                    }}
                >
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <div className="fixed-top ">
                            <div className="top-nav">
                                <div className="container-md pt-2 px-0">
                                    <div className="d-flex justify-content-center justify-content-lg-start con">
                                        <div className="link-a px-md-2 px-1  right-border inf-lef" href={"callto:" + info.phone}><i className="fa fa-phone mx-2" aria-hidden="true" />
                                            {info.phone}
                                        </div>
                                        <a className="link-a px-md-2 px-1 inf-lef" href={"mailto:" + info.email}><i className="fa fa-envelope mx-2" aria-hidden="true" />
                                            {info.email}</a>

                                    </div>
                                    <div className="content-left  res-nav">
                                        <div className="logo text-light">
                                            Minh Tài <sup>MT</sup>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center justify-content-md-end my-right con res-none">
                                        <div className="flex-column acc res-none">
                                            <Link className="link-a p-2 mr-2 right-border" onClick={(e) => goLogin(e)} to="/login.html">
                                                <i className="far fa-user mx-2" aria-hidden="true" />
                                                {sessionStorage.getItem('username') !== null ? sessionStorage.getItem('username') : "Tài khoản"}</Link>
                                            {sessionStorage.getItem('userID') &&
                                                <Link to="/properties.html" className="link-a p-2 text-left logout">Thông tin</Link>}
                                            {sessionStorage.getItem('userID') &&
                                                <div onClick={() => clickOut()} className="link-a p-2 text-left logout">Đăng xuất</div>}

                                        </div>
                                        <Link className="link-a px-2 mr-2 right-border res-none" to="/cart.html"> <i className="fas mx-2 fa-shopping-bag"></i>Giỏ hàng</Link>
                                        <Link className="link-a mr-2 res-none" to="/u/order"> <i className="fas mx-2 fa-shipping-fast"></i>Đơn hàng</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="center-nav">
                                <div className="d-flex  justify-content-around">
                                    <div className="content-left res-none">
                                        <div className="logo">
                                            Minh Tài <sup>MT</sup>
                                        </div>
                                    </div>
                                    <div className=" d-flex content-sea justify-content-between">
                                        <div className='res-nav'>
                                            <Button aria-controls="simple-menu" className="menu-bu " aria-haspopup="true" onClick={handleClick}><i className=" pt-1 m-0 fas fa-ellipsis-v"></i></Button>

                                        </div>
                                        <div className=" content-sea">
                                            {search === '' ? <Link className=" sea  fas fa-search text-dark" to='/index/search'></Link> : ''}

                                            <input className=" sea  shadow-none mr-sm-2 border-0 fff" name="search" onKeyDown={find} onChange={(e) => inputValue(e)} type="text" placeholder="Nhập tên sản phẩm cần tìm ...." />

                                            {search !== '' ? <Link className=" sea  fas fa-search text-dark" to='/index/search' onClick={() => dispatch(getSearch(search))}></Link> : ''}

                                        </div>
                                        <div className='res-nav'>
                                            <Button aria-controls="simple-account" className="accou-bu" aria-haspopup="true" onClick={handleClickShow}><i className="pt-1 fas mr-2 fa-user-circle"></i></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" bottom-nav ">
                                <div className="res-nav">
                                    <div className="d-flex justify-content-end px-3">
                                    </div>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={ishow}
                                        keepMounted
                                        open={Boolean(ishow)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Link to="/index">Trang chủ</Link></MenuItem>
                                        {datatypes.map((x, key) => {
                                            return <MenuItem key={key} onClick={handleClose}><a href={'/index#' + x._id} >{x.typename}</a></MenuItem>
                                        })
                                        }

                                        <MenuItem onClick={handleClose}>
                                            <Link to="/index" className="nav-link nav-bd " >Bảng giá</Link></MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to="/index" className="nav-link nav-bd" >Hướng dẫn dịch vụ</Link></MenuItem>
                                    </Menu>
                                </div>
                                <div className="res-nav ml-auto">
                                    <Menu
                                        id="simple-account"
                                        anchorEl={ishowAcc}
                                        keepMounted
                                        open={Boolean(ishowAcc)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Link onClick={(e) => goLogin(e)} to="/login.html">
                                                <i className="fas mr-2 fa-user-circle"></i>
                                                {sessionStorage.getItem('username') !== null ? sessionStorage.getItem('username') : "Tài khoản"}</Link>
                                        </MenuItem>
                                        {sessionStorage.getItem('userID') &&
                                            <MenuItem onClick={handleClose}>
                                                <Link to="/properties.html"><i className="fas mr-2 fa-info-circle"></i>Thông tin</Link></MenuItem>}

                                        <MenuItem onClick={handleClose}>
                                            <Link to="/cart.html"> <i className="fas mr-2 fa-shopping-bag"></i>Giỏ hàng</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>

                                            <Link to="/u/order"> <i className="fas mr-2 fa-shipping-fast"></i>Đơn hàng</Link>
                                        </MenuItem>
                                        {sessionStorage.getItem('userID') &&

                                            <MenuItem onClick={handleClose}>
                                                <Link to="/login.html" onClick={() => clickOut()}><i className="fas mr-2 fa-sign-out-alt"></i>Đăng xuất</Link>
                                            </MenuItem>
                                        }
                                    </Menu>

                                </div>


                                <div className="container-md res-none">
                                    <ul className="ml-auto">
                                        <div className="row menu-item">
                                            <li className="list-group-item nav-link btn btn-link">
                                                <Link className="nav-link nav-bd" to="/index">Trang chủ</Link>
                                            </li>
                                            {datatypes.map((x, key) => {
                                                return (
                                                    <li key={key} className="list-group-item nav-link btn btn-link "><a href={'#' + x._id} className="nav-link nav-bd" >{x.typename}</a>

                                                        <ul className="list-group list-sub position-absolute">
                                                            {datacates.filter(y => y.typeid === x._id).map((z, key) => {
                                                                return (<Link key={key} to={"/index/" + to_slug(z.catelogy) + "/" + z._id + ".html"}
                                                                    onClick={() => sendIDCate(z._id)}
                                                                    >
                                                                    <li className="list-group-item sub-item nav-link nav-bd">
                                                                        {z.catelogy}
                                                                    </li></Link>)
                                                            })}
                                                        </ul>
                                                    </li>
                                                )
                                            })}

                                            <li className="list-group-item nav-link btn btn-link ">
                                                <Link to="/index" className="nav-link nav-bd " >Bảng giá</Link>
                                            </li>
                                            <li className="list-group-item nav-link btn btn-link ">
                                                <Link to="/index" className="nav-link nav-bd" >Hướng dẫn dịch vụ</Link>
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>



                    </nav>
                </Headroom>

            </LoadingScreen>
        )
    }

export default withRouter(Header)

