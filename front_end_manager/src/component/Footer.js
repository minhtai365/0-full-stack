import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="bg-dark text-light pt-4 pb-3 mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-6">
                                    <h5>CÔNG TY VN</h5>
                                    <p>Địa chỉ: Số 9, Phố Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</p>
                                    <p>Số điện thoại: 0967478588</p>
                                    <p>Email: hotro@keyweb.vn</p>
                                </div>
                                <div className="col-md-3 col-6">
                                    <h5>CHÍNH SÁCH</h5>
                                    <p>Chính sách thanh toán</p>
                                    <p>Chính sách vận chuyển</p>
                                    <p>Chính sách bảo mật thông tin</p>
                                </div>
                                <div className="col-md-5 col-12">
                                    <h3>Kết nối với chúng tôi</h3>
                                    <div className="footer-content">
                                        <button className="btn btn-link text-primary" ><i className="fab fa-facebook-f" /></button>
                                        <button className="btn btn-link text-danger" ><i className="fab fa-youtube" /></button>
                                        <button className="btn btn-link text-info" ><i className="fab fa-twitter" /></button>
                                        <button className="btn btn-link text-light" ><i className="fab fa-instagram" /></button>
                                    </div>
                                    <div className="form">
                                        <h4> Đăng ký nhận tin</h4>
                                        <p> Mỗi tháng chúng tôi đều có những đợt giảm giá dịch vụ và sản phẩm nhằm chi
                                        ân khách hàng. Để có thể cập nhật kịp thời những đợt giảm giá này, vui lòng nhập địa chỉ
              email của bạn vào ô dưới đây.</p>
                                        <form>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input type="email" className="form-control"aria-describedby="emailHelpId" placeholder="Your email" />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary">
                        <div className="container text-light">
                            <div className="d-flex justify-content-between flex-md-row flex-column">
                                <div>Copyright 2020 © Minh Tài</div>
                                <div>Thiết kế website bởi Minh Tài</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
