import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Footer from '../layout/Footer';
import Header from '../layout/Header';

class Detail extends Component {
    formatMoney(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    componentWillMount() {
        Axios.post('/products/viewitem', {
            id: this.props.match.params.id
        })
            .then(res => {
                // console.log(res.data);
            })
    }
    componentDidMount() {
        window.scrollTo(0, 0)
      }
    clickAdd = (item) => {
        if(sessionStorage.getItem("userID")===null){
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
        }
        else if(item.proNumber!==0){
            Axios.post('/cart/add',{
                userid:sessionStorage.getItem('userID'),
                product:item
            })
            .then(res=>{
                // this.props.history.push(res.da);
                alert(res.data);
            })
            .catch(err=>{
                alert(err);
            })
        }
        else{
            alert('Sản phẩm hết hàng')
        }
    }
    render() {
        // let {id}=useParams();
        return (
            <div>
                <Header />
                {this.props.dataproducts.filter(y => y._id === this.props.match.params.id).map((x, key) =>
                    <div key={key} className="container content-chitiet">
                        <div className="d-flex mb-4">
                            <li className="list-ds"><Link to="index.html">Trang chủ &gt;</Link></li>
                            {/* <li className="list-ds"><Link to="#">Trang phục &gt;</Link></li> */}
                            <li className="list-ds" aria-current="page">Sản phẩm</li>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                
                            <img id="img" src={x.imgPath} width="350" alt="Ảnh chi tiết" />
                                {/* <div className="row">
                                    <div className="col-2 d-flex flex-column">
                                        <a color-id={27803} className="active show">
                                            <img className="lazyload" data-image="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/420x630/Mn57VG5pD2JWDa3SgS3BuHqYatDFaZCbGgqWv5ML.jpeg" data-zoom-image="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/Mn57VG5pD2JWDa3SgS3BuHqYatDFaZCbGgqWv5ML.jpeg" src="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/50x75/Mn57VG5pD2JWDa3SgS3BuHqYatDFaZCbGgqWv5ML.jpeg" />
                                        </a>
                                        <a color-id={27803} className="show">
                                            <img className="lazyload" data-image="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/420x630/rfvqso9qC9P07n5WcILOzUtasB9YqaO25AsyYH1Y.jpeg" data-zoom-image="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/rfvqso9qC9P07n5WcILOzUtasB9YqaO25AsyYH1Y.jpeg" src="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/50x75/rfvqso9qC9P07n5WcILOzUtasB9YqaO25AsyYH1Y.jpeg" />
                                        </a>
                                        <a color-id={27803} className="show">
                                            <img className="lazyload" data-image="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/420x630/gelF1xKIW8ZNq1nMrzqTkrFFHjw9PxuGd22Uurko.jpeg" data-zoom-image="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/gelF1xKIW8ZNq1nMrzqTkrFFHjw9PxuGd22Uurko.jpeg" src="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/50x75/gelF1xKIW8ZNq1nMrzqTkrFFHjw9PxuGd22Uurko.jpeg" />
                                        </a>
                                    </div>
                                    <div>
                                        <div className="imageNav">
                                            <div className="icon icon-imgnext" />
                                            <div className="icon icon-imgprev" />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="col-md-6 col-12">
                                <ul>
                                    <li className="list-ds">
                                        {/* <input type="hidden" id="product_id" defaultValue={60623} /> */}
                                        {/* <h4 className="title">D.CHIC</h4> */}
                                        <h3><span id="product_name">{x.title}</span></h3>
                                        <div className="desc">


                                            <strike className="card-text">{this.formatMoney(x.price)} VND</strike>
                                            <p className="card-text text-danger">{this.formatMoney(x.sale)} VND || Giảm {parseInt((x.price - x.sale) / x.price * 100)}%</p>

                                        </div>
                                    </li>
                                    <hr />
                                    {/* <li className="list-ds">
                                        <div className="mb-2">Chọn thời gian</div>
                                        <div id="day" className="float-left">
                                            <div >
                                                <label className="btn btn-info">
                                                    <div><input type="radio" value="1" name="day" onChange={this.onChose} /> 1 ngày</div>
                                                </label>
                                                <label className="btn btn-info">
                                                    <div><input type="radio" value="3" name="day" onChange={this.onChose} /> 3 ngày</div>
                                                </label>
                                                <label className="btn btn-info">
                                                    <div><input type="radio" value="7" name="day" onChange={this.onChose} /> 7 ngày</div>
                                                </label>
                                                <label className="btn btn-info">
                                                    <div><input type="radio" value="0" name="day" onChange={this.onChose} /> Chọn mua</div>
                                                </label>
                                            </div>
                                        </div>
                                        <label className="float-right">
                                            <span id="viewsizeguide">Size Guide</span>
                                        </label>
                                        <div className="clearfix" />
                                        <div className="validator hide">Vui lòng chọn thời gian khi đặt thuê</div>
                                    </li> */}

                                     <div role="tab" id="mota">
                                            <h5 className="mb-0">
                                                <a className="collap-item" data-toggle="collapse" data-parent="#chitiet" href="#motasp" aria-expanded="true" aria-controls="chitiet">
                                                    Mô tả sản phẩm</a>
                                            </h5>
                                        </div>
                                        <div id="motasp" className="collapse in show" role="tabpanel" aria-labelledby="mota">
                                            <div className="content product--content">
                                                <div className="form-group row">
                                                    <label className="col-sm-4 control-label">Màu sắc: </label>
                                                    <label className="col-sm-8 control-label text-uppercase border-left">{x.color}</label>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 control-label">Kích thước: </label>
                                                    <label className="col-sm-8 control-label text-uppercase border-left">{x.size}</label>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 control-label">Chất liệu sản phẩm :</label>
                                                    <label className="col-sm-8 control-label text-uppercase border-left">{x.type}</label>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-4 control-label">Số lượng kho :</label>
                                                    <label className="col-sm-8 control-label text-uppercase border-left">{x.proNumber}</label>
                                                </div>
                                            </div>
                                        </div>
                                    <hr />
                                    <li className="list-ds mb-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button className="btn btn-primary" onClick={()=>this.clickAdd(x)}>Thêm vào giỏ hàng</button>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <button className="btn btn-secondary">Đặt thuê</button>
                                            </div> */}
                                        </div>
                                    </li>
                                    <hr />
                                    <div id="chitiet" role="tablist" aria-multiselectable="true">
                                       
                                        <hr />
                                        <div role="tab" id="doitrasp">
                                            <h5 className="mb-0">
                                                <a className="collap-item" data-toggle="collapse" data-parent="#chitiet" href="#doitra" aria-expanded="true" aria-controls="doitra">
                                                    Chính sách đổi trả
              </a>
                                            </h5>
                                        </div>
                                        <div id="doitra" className="collapse in" role="tabpanel" aria-labelledby="doitrasp">
                                            <div >
                                                <div className="content">
                                                    {this.props.info.dtra}
                <div className="text-right margin-top10"><a className="view-all" href="https://ferosh.vn/chinh-sach-doi-tra.html">Xem chi tiết</a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div role="tab" id="thanhtoansp">
                                            <h5 className="mb-0">
                                                <a className="collap-item" data-toggle="collapse" data-parent="#chitiet" href="#thanhtoan" aria-expanded="true" aria-controls="thanhtoan">
                                                    Chính sách thanh toán
              </a>
                                            </h5>
                                        </div>
                                        <div id="thanhtoan" className="collapse in" role="tabpanel" aria-labelledby="thanhtoansp">
                                            <div >
                                                <div className="content">
                                                    
                                                {this.props.info.ttoan}
                <div className="text-right margin-top10"><a className="view-all" href="https://ferosh.vn/chinh-sach-thanh-toan.html">Xem chi tiết</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div role="tab" id="giaohangsp">
                                            <h5 className="mb-0">
                                                <a className="collap-item" data-toggle="collapse" data-parent="#chitiet" href="#giaohang" aria-expanded="true" aria-controls="giaohang">
                                                    Chính sách giao hàng
              </a>
                                            </h5>
                                        </div>
                                        <div id="giaohang" className="collapse in" role="tabpanel" aria-labelledby="giaohangsp">
                                            <div >
                                                <div className="content">
                                                   
                                                {this.props.info.vchuyen}
                <div className="text-right margin-top10"><a className="view-all" href="https://ferosh.vn/chinh-sach-giao-hang.html">Xem chi tiết</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <li className="list-ds">
                          <div className="upcase share">
                          <span>Share</span>
                          <a className="icon icon-fb" href="#"></a>
                          <a className="icon icon-in" href="#"></a>
                          <a className="icon icon-mail" href="#"></a>
                          </div>
                      </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>)}
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        dataproducts: state.dataproducts,
        info:state.info
    }
}
export default connect(mapStateToProps)(withRouter(Detail))