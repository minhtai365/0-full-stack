import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Boxicon from '../layout/Boxicon';
import Carousel from '../layout/Carousel';
import {to_slug,formatMoney} from '../layout/FormatSlug';
// import { Pagination } from '@material-ui/lab';
import Pagination from './Pagination';
function MainFilter(props) {
    const dt = useSelector(state => state.getdata.dt);
    const datacates = useSelector(state => state.getdata.datacates);
    const datatypes = useSelector(state => state.getdata.datatypes);
    const page = useSelector(state => state.getdata.page);
    const foc = useRef(null)
    // this.foc = React.createRef()

    
    // function formatMoney(t) {
    //     return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // }
    function loadTitle() {
        var dt = [];
        datacates.forEach(ca => {
            if (ca._id === props.match.params.id) {
                datatypes.forEach(ty => {
                    if (ty._id === ca.typeid) {
                        dt = ty
                    }
                })
            }
        });
        return <div>
            <div id='topage' className="jumbotron jumbotron-fluid">
                <div ref={foc} className="container">

                    <h5 className="display-3 text-center">{dt.typename}</h5>
                    <hr className="my-2" />
                </div>
            </div>

            <div className="container">
                <div className="col-3" style={{ float: 'left' }}>
                    <div className="list-group ">
                        {datacates.filter(y => y.typeid === dt._id).map((x, key) => (
                            <button key={key} className="dropdown-item item-click border-left border-bottom"
                            // onClick={() => clickItem(x._id)} 
                            >{x.catelogy}</button>))}

                    </div>
                </div>
            </div>
        </div>
    }
    function loadProducts() {
        var mydt = dt;
        // if(search!==''){
        //     mydt=dt.filter(x => x.title.toLowerCase().indexOf(search) !== -1);
        // }
        var pa = 6;
        var start = (page - 1) * pa;
        var end = page * pa;
        return (
            mydt.slice(start, end).map((x, key) =>
                <div key={key} className="col-lg-4 col-md-6 col-6 mt-3">
                    <div className="shadow card-form">
                        <Link to={"/chi-tiet/" + to_slug(x.title) + "/" + x._id + ".html"}>
                            {/* <div className="img-cart"> */}
                            {/* width="100%" height="100%" */}
                            <img className="img-zoom" src={x.imgPath} alt="" />
                            {/* </div> */}
                            <div className="card-body body-cart ">
                                <div className="title-cart ">{x.title}</div>
                                <strike className="card-text text-danger ">{formatMoney(x.price)} VND</strike>
                                <p className="card-text text-dark">{formatMoney(x.sale)} VND || Giảm {parseInt((x.price - x.sale) / x.price * 100)}%</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        )
    }
    useEffect(() => {
        window.scrollTo(0, foc.current.offsetTop)
    }, []);

    return (
        <div>
            <Carousel />
            <hr />
            <Boxicon />
            {loadTitle()}
            <div className="container">
                <div className="col-9" style={{ float: 'right' }}>
                    <div className="row">
                        {loadProducts()}
                    </div>
                </div>

            </div>
            <div className="clearfix" />
            <Box display="flex" justifyContent="flex-end">
                {/* <Pagination count={parseInt(props.dataproducts.length/2)+1} page={state.page} onChange={handleChange} /> */}
                <a href="#topage"> <Pagination id={'1'} /></a>
            </Box>
            <Box display="flex" justifyContent="center">
                <Typography>page:{page}</Typography>
            </Box>
            {/* <Footer /> */}
        </div>

    );
}
export default MainFilter