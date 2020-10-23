import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import GoogleMap from './GoogleMap';

function Footer(props) {
    const info= useSelector(state =>state.getdata.info);
    const {location: {pathname}} = props;
        if (pathname.slice(1,6) ==='admin') {
            return null
        }
        return (
            <div>
                <div>
                    <div className="bg-dark text-light pt-4 pb-3 mt-5">
                        <div className="container">
                            <div className="row">
                                
                            <div className="col-md-7 col-12">
                            <div className="row">
                                <div className="col-md-7 col-6">
        <h5>{info.name}</h5>
                                    <p>Địa chỉ: {info.address}</p>
                                    <p>Số điện thoại: {info.phone}</p>
                                    <p>Email: {info.email}</p>
                                </div>
                                <div style={{}} className="col-md-5 col-6">
                                    <h5>CHÍNH SÁCH</h5>
                                    <p>Chính sách thanh toán</p>
                                    <p>Chính sách đổi trả</p>
                                    <p>Chính sách giao hàng</p>
                                </div>
                                
                                {/* <GoogleMap/> */}
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d548.3053387108054!2d108.18154096078594!3d16.06825865735994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1602664566447!5m2!1svi!2s"
                                 style={{width:'500px',height:'300px',border:'0'}} frameBorder="0" aria-hidden="false" tabIndex="0"/>
                                </div>
                                </div>
                                <div className="col-md-5 col-12">
                                    <h3>Kết nối với chúng tôi</h3>
                                    <div className="footer-content">
                                        <button className="btn btn-link px-4 px-md-3  text-primary" >
                                            <i className="fab fa-facebook-f" /></button>
                                        <button className="btn btn-link px-4 px-md-3 text-danger" >
                                            <i className="fab fa-youtube" /></button>
                                        <button className="btn btn-link px-4 px-md-3 text-info" >
                                            <i className="fab fa-twitter" /></button>
                                        <button className="btn btn-link px-4 px-md-3 text-light" >
                                            <i className="fab fa-instagram" /></button>
                                    </div>
                                    <div className="form">
                                        <h4> Đăng ký nhận tin</h4>
                                        <p> Mỗi tháng chúng tôi đều có những đợt giảm giá dịch vụ và sản phẩm nhằm chi
                                        ân khách hàng. Để có thể cập nhật kịp thời những đợt giảm giá này, vui lòng nhập địa chỉ
              email của bạn vào ô dưới đây.</p>
                                        <form>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input type="email" className="form-control"
                                                 aria-describedby="emailHelpId" placeholder="Your email" />
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
    

export default withRouter(Footer)
