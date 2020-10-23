import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {to_slug,formatMoney} from '../layout/FormatSlug';
// import { Pagination } from '@material-ui/lab';
import Pagination from './Pagination';
function ResultSearch(){
    const dataproducts = useSelector(state => state.getdata.dataproducts);
    const search = useSelector(state => state.getdata.search);
    const page = useSelector(state => state.getdata.page);
    
   
    
        return (
            <div>
                <div id='topage'  className="jumbotron jumbotron-fluid content-chitiet">
                    <div className="container mt-5 pt-5">

                        <h5 className="display-3 text-center">Kết quả tìm kiếm</h5>
                        <hr className="my-2" />
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {dataproducts.filter(y =>
                         y.title.toLowerCase().indexOf(search) !== -1).slice((page - 1) * 6, page * 6).map((x, key) =>
                            <div key={key} className="col-lg-3 col-md-6 col-6 mt-3">
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
                        )}

                    </div>
                </div>
                <Box display="flex" justifyContent="flex-end">
                            {/* <Pagination count={parseInt(this.props.dataproducts.length/2)+1} page={this.state.page} onChange={this.handleChange} /> */}
                            <a href="#topage"> <Pagination id={'0'} /></a>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Typography>page:{page}</Typography>
                        </Box>
                {/* <Footer /> */}
            </div>
        )
    }

export default ResultSearch