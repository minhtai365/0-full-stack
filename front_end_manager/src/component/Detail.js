import React, { Component } from 'react'
import Main from './Main'

export default class Menu extends Component {
    render() {
        return (
            <div className="container content-chitiet">
                <div className="d-flex mb-4">
                    <li className="list-ds"><a href="#">Trang chủ &gt;</a></li>
                    <li className="list-ds"><a href="#">Trang phục &gt;</a></li>
                    <li className="list-ds" aria-current="page">Sản phẩm</li>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="row">
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
                                <img src="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/420x630/Mn57VG5pD2JWDa3SgS3BuHqYatDFaZCbGgqWv5ML.jpeg" data-zoom-image="https://ferosh.vn/storage/images/5912c6ecaa460c649f8ac6c616b7b465/Mn57VG5pD2JWDa3SgS3BuHqYatDFaZCbGgqWv5ML.jpeg" />
                                <div className="imageNav">
                                    <div className="icon icon-imgnext" />
                                    <div className="icon icon-imgprev" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <ul>
                            <li className="list-ds">
                                <input type="hidden" id="product_id" defaultValue={60623} />
                                <h4 className="title">D.CHIC</h4>
                                <h3><span id="product_name">Áo Yếm Nhún Ngực Đỏ Mận</span></h3>
                                <div className="desc">
                                    <input type="hidden" id="price" defaultValue={900000.0000} />
                                    <input type="hidden" id="txtAlias" defaultValue="ao-yem-nhun-nguc-do-man-26" />
                                    <strike className="color-red"><span className="color-black">900.000
                VND</span></strike>
                                    <br />
                                    <span className="text-danger">
                                        450.000 VND | Giảm
              50%</span>
                                </div>
                            </li>
                            <hr />
                            <li className="list-ds">
                                <div className="mb-4">Chọn thời gian</div>
                                <div id="day" className="float-left">
                                    <label size-id={1} size-name="S" className="btn btn border-primary"><a href>1</a></label>
                                    <label size-id={2} size-name="M" className="btn btn border-primary"><a href>3</a></label>
                                    <label size-id={4} size-name="L" className="btn btn border-primary"><a href>7</a></label>
                                </div>
                                <label className="float-right">
                                    <span id="viewsizeguide">Size Guide</span>
                                </label>
                                <div className="clearfix" />
                                <div className="validator hide">Vui lòng chọn thời gian khi đặt thuê</div>
                            </li>
                            <hr />
                            <li className="list-ds mb-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="button" className="btn btn-primary form-control" defaultValue="Đặt mua" />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="button" className="btn btn-secondary form-control" defaultValue="Đặt thuê" />
                                    </div>
                                </div>
                            </li>
                            <hr />
                            <div id="chitiet" role="tablist" aria-multiselectable="true">
                                <div className role="tab" id="mota">
                                    <h5 className="mb-0">
                                        <a className="collap-item" data-toggle="collapse" data-parent="#chitiet" href="#motasp" aria-expanded="true" aria-controls="chitiet">
                                            Mô tả sản phẩm
              </a>
                                    </h5>
                                </div>
                                <div id="motasp" className="collapse in" role="tabpanel" aria-labelledby="mota">
                                    <div className="content product--content">
                                        <p><strong>SKU</strong> : 60623</p>
                                        <p style={{ whiteSpace: 'pre-line' }}>Màu sắc: đỏ mận
                Phù hợp mặc đi chơi, dạo phố</p>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword3" className="col-sm-4 control-label">Chiều dài sản
                  phẩm</label>
                                            <label htmlFor="inputPassword3" className="col-sm-8 control-label"> </label>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword3" className="col-sm-4 control-label">Có lót</label>
                                            <label htmlFor="inputPassword3" className="col-sm-8 control-label">Không</label>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword3" className="col-sm-4 control-label">Có co
                  giãn</label>
                                            <label htmlFor="inputPassword3" className="col-sm-8 control-label">Không</label>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPassword3" className="col-sm-4 control-label">Chất liệu sản
                  phẩm</label>
                                            <label htmlFor="inputPassword3" className="col-sm-8 control-label">Kate</label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className role="tab" id="doitrasp">
                                    <h5 className="mb-0">
                                        <a className="collap-item" data-toggle="collapse" data-parent="#chitiet" href="#doitra" aria-expanded="true" aria-controls="doitra">
                                            Chính sách đổi trả
              </a>
                                    </h5>
                                </div>
                                <div id="doitra" className="collapse in" role="tabpanel" aria-labelledby="doitrasp">
                                    <div className>
                                        <div className="content">
                                            FEROSH chấp nhận đổi/trả hàng trong thời gian 03 ngày làm việc, áp dụng không
                                            đồng đều đối
                                            với từng mặt hàng và sản phẩm khác nhau. Quý khách vui lòng kiểm tra chi tiết về
                                            chính sách
                                            đổi và trả hàng theo link.
                <div className="text-right margin-top10"><a className="view-all" href="https://ferosh.vn/chinh-sach-doi-tra.html">Xem chi tiết</a></div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className role="tab" id="thanhtoansp">
                                    <h5 className="mb-0">
                                        <a className="collap-item" data-toggle="collapse" data-parent="#chitiet" href="#thanhtoan" aria-expanded="true" aria-controls="thanhtoan">
                                            Chính sách thanh toán
              </a>
                                    </h5>
                                </div>
                                <div id="thanhtoan" className="collapse in" role="tabpanel" aria-labelledby="thanhtoansp">
                                    <div className>
                                        <div className="content">
                                            FEROSH cung cấp 4 hình thức thanh toán cho quý khách: Thanh toán khi nhận hàng
                                            (COD), Chuyển
                                            khoản, Thanh toán qua thẻ tín dụng, Thanh toán qua thẻ ATM.
                <div className="text-right margin-top10"><a className="view-all" href="https://ferosh.vn/chinh-sach-thanh-toan.html">Xem chi tiết</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className role="tab" id="giaohangsp">
                                    <h5 className="mb-0">
                                        <a className="collap-item" data-toggle="collapse" data-parent="#chitiet" href="#giaohang" aria-expanded="true" aria-controls="giaohang">
                                            Chính sách giao hàng
              </a>
                                    </h5>
                                </div>
                                <div id="giaohang" className="collapse in" role="tabpanel" aria-labelledby="giaohangsp">
                                    <div className>
                                        <div className="content">
                                            Đơn hàng sẽ được giao cho Quý khách trong vòng 07 - 10 ngày làm việc kể từ ngày
                                            đặt đơn. Quý
                                            khách có thể liên hệ với Ferosh qua Email, Điện thoại, Facebook để được biết về
                                            lộ trình đơn
                                            hàng của mình . Chi tiết về chính sách giao hàng Quý khách vui lòng click vào
                                            link.
                <div className="text-right margin-top10"><a className="view-all" href="https://ferosh.vn/chinh-sach-giao-hang.html">Xem chi tiết</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <li class="list-ds">
                          <div class="upcase share">
                          <span>Share</span>
                          <a class="icon icon-fb" href="#"></a>
                          <a class="icon icon-in" href="#"></a>
                          <a class="icon icon-mail" href="#"></a>
                          </div>
                      </li> */}
                        </ul>
                    </div>
                </div>

                <Main/>
            </div>

        )
    }
}
