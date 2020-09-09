import React, { Component } from 'react'

export default class Boxicon extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row mt-5 text-center">
                        <div className="col-md-3 col-12 ">
                            <i className="fas fa-truck" style={{ fontSize: '40px' }} />
                            <div className>Giao hàng toàn quốc</div>
                            <div className>Nhận ship toàn quốc tất cả các sản phẩm</div>
                        </div>
                        <div className="col-md-3 col-12 ">
                            <i className="fas fa-exchange-alt" style={{ fontSize: '40px' }} />
                            <div className>Đổi trả hàng</div>
                            <div className>Không áp dụng đổi trả cho sản phẩm sale off</div>
                        </div>
                        <div className="col-md-3 col-12 ">
                            <i className="fas fa-hand-holding-usd" style={{ fontSize: '40px' }} />
                            <div className>Giao hàng nhận tiền</div>
                            <div className>Thanh toán đơn hàng bằng hình thức trực tiếp ở Tp.HCM </div>
                        </div>
                        <div className="col-md-3 col-12 ">
                            <i className="fas fa-phone-volume" style={{ fontSize: '40px' }} />
                            <div className>Đặt hàng online</div>
                            <div className>0933880767 - 0933597986</div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
