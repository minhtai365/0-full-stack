import React, { Component } from 'react';
import axios from 'axios';
const getproduct = () => axios.get('/product').then(res => res.data)
class Main extends Component {
    constructor() {
        super();
        this.state = {
            dt: []
        }
    }
    componentWillMount() {
        getproduct().then(res => {
            // console.log(res);
            this.setState({
                dt: res
            })
        })
    }
    render() {
        // console.log(this.state.dt);
        return (
            <div >
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h5 className="display-3 text-center">Trang phục</h5>
                        <hr className="my-2" />
                    </div>
                </div>

                <div className="container">
                    <div className="col-3" style={{ float: 'left' }}>
                        <div className="list-group ">
                            <a className="dropdown-item border-left border-top border-bottom" href="#">Đầm dự tiệc</a>
                            <a className="dropdown-item border-left border-bottom" href="#">Áo cưới</a>
                            <a className="dropdown-item border-left border-bottom" href="#">Áo dài</a>
                            <a className="dropdown-item border-left border-bottom" href="#">Cổ trang</a>
                            <a className="dropdown-item border-left border-bottom" href="#">Khác</a>
                        </div>
                    </div>
                    <div className="col-9" style={{ float: 'right' }}>
                        <div className="row">
                            {this.state.dt.map(x =>
                                <div className="col-lg-4 col-md-6 col-12 mt-3">
                                    <div className="card" style={{ height: '100%' }}>
                                        <img className="card-img-top" src={x.imgPath} alt="" />
                                        <div className="card-body">
                                            <h4 className="card-title">{x.title}</h4>
                                            <strike className="card-text">{x.price} VND</strike>
                                            <p className="card-text text-danger">{x.sale} VND || Giảm {parseInt(x.price - x.sale) / x.price * 100}%</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="clearfix" />
            </div>

        );
    }
}

export default Main;