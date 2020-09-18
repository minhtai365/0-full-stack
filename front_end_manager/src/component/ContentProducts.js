import Axios from 'axios';
import React, { Component } from 'react'

import Model from 'react-modal';
export default class ContentProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataproducts: [],
            datacatelogys: [],
            isShow: false,
            _id: ''
        }
    }
    componentWillMount() {
        Axios.get('/products')
            .then(res => {
                this.setState({
                    dataproducts: res.data
                })
            })
            .catch(err => {
                console.log(err);
            }
            )
        Axios.get('/catelogys')
            .then(res => {
                this.setState({
                    datacatelogys: res.data
                })
            })
            .catch(err => {
                console.log(err);
            }
            )
    }
    componentDidMount() {
        Model.setAppElement("#modal");
    }
    ischange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    setData = () => {
        Axios.post('/addproducts', {
            _id: this.state._id,
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            sale: this.state.sale,
            imgPath: this.state.imgPath,
            proNumber: this.state.proNumber,
            catelogyid: this.state.catelogyid
        })
            .then(res => {
                if (res.data === 'create ok' || res.data === 'edit ok') {

                    Axios.get('/products')
                        .then(res => {
                            this.setState({
                                dataproducts: res.data
                            })
                        })
                    alert("Thành công");
                }
                else alert(res.data)
            })
            .catch(err => {

                alert('Thất bại');
            }
            )
        this.setState({
            isShow: !this.state.isShow
        })
    }


    showModel = (id) => {
        if (id !== '') {
            this.state.dataproducts.forEach(element => {
                if (element._id === id) {
                    this.setState({
                        _id: element._id,
                        title: element.title,
                        description: element.description,
                        price: element.price,
                        sale: element.sale,
                        proNumber: element.proNumber,
                        imgPath: element.imgPath,
                        catelogyid: element.catelogyid
                    })
                }
            });
        } else {
            this.setState({
                _id: '',
                title: '',
                description: '',
                price: '',
                sale: '',
                proNumber: '',
                imgPath: '',
                catelogyid: ''
            })
        }
        this.changShow();
    }
    changShow() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    remove = (id) => {
        Axios.post('/remove', {
            id: id
        })
            .then(res => {
                if (res.data === "remove ok") {
                    var products = this.state.dataproducts.filter(x => x._id !== id);
                    this.setState({
                        dataproducts: products
                    })
                    alert("Xóa thành công");
                }
                else {
                    alert("Lỗi hệ thống");
                }
            })
            .catch(err => {
                alert(err);
            })
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle ml-auto" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tài khoản</a>
                            <div className="dropdown-menu" aria-labelledby="dropdownId">
                                <a className="dropdown-item" href="#">Đăng xuất</a>
                                <a className="dropdown-item" href="#">Thông tin</a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <Model
                    isOpen={this.state.isShow}
                    className="Modal"
                    overlayClassName="Overlay"
                // style={{
                //     overlay: {
                //         backgroundColor: 'blue'
                //     },
                //     content: {
                //         color: 'red'
                //     }
                // }}
                >
                    <div className="form-group">

                        <div className="form-group">
                            <button class="btn btn-primary" onClick={() => this.changShow()} >X</button>
                        </div>
                        <label>Tên Sản phẩm</label>
                        <input type="text"
                            className="form-control" onChange={this.ischange} name="title" aria-describedby="helpId" defaultValue={this.state.title || ""} />

                        <label>Mô tả</label>
                        <input type="text"
                            className="form-control" onChange={this.ischange} name="description" aria-describedby="helpId" defaultValue={this.state.description || ""} />

                        <label>Giá</label>
                        <input type="text"
                            className="form-control" onChange={this.ischange} name="price" aria-describedby="helpId" defaultValue={this.state.price || ""} />

                        <label>Giá sale</label>
                        <input type="text"
                            className="form-control" onChange={this.ischange} name="sale" aria-describedby="helpId" defaultValue={this.state.sale || ""} />

                        <label>Số lượng</label>
                        <input type="text"
                            className="form-control" onChange={this.ischange} name="proNumber" aria-describedby="helpId" defaultValue={this.state.proNumber || ""} />
                        <label>Hình ảnh</label>
                        <input type="text"
                            className="form-control" onChange={this.ischange} name="imgPath" aria-describedby="helpId" defaultValue={this.state.imgPath || ""} />

                        <label>Doanh mục</label>
                        <div className="form-group">
                            <select className="form-control" defaultValue={this.state.catelogyid} onChange={this.ischange} name="catelogyid" id="typeid">
                                {this.state.datacatelogys.map(x => {
                                    return <option value={x._id}>{x.catelogy}</option>
                                })}
                            </select>
                        </div>

                        <button class="btn btn-primary" type="reset" onClick={this.setData} role="button">Add</button>
                    </div>
                </Model>

                <div className='container' id="modal">
                    <a class="btn btn-primary" onClick={() => this.showModel('')} role="button">Add</a>
                    <table className="table table-striped table-inverse table-responsive">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Mô tả</th>
                                <th>Giá trước sale</th>
                                <th>Giá sau sale</th>
                                <th>Số lượng</th>
                                <th>Loại doanh mục</th>
                                <th>Created</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dataproducts.map(x => {
                                return <tr>
                                    <td ><img src={x.imgPath} width={50} alt="Hình ảnh sản phẩm" /></td>
                                    <td>{x.title}</td>
                                    <td>---</td>
                                    <td>{x.price}</td>
                                    <td>{x.sale}</td>
                                    <td>{x.proNumber}</td>
                                    {this.state.datacatelogys.filter(y => y._id === x.catelogyid).map(z => {
                                        return <td>{z.catelogy}</td>
                                    })}
                                    <td>{x.created}</td>
                                    <td><a class="btn btn-primary" onClick={(id) => this.showModel(x._id)} role="button">Edit</a></td>
                                    <td><a class="btn btn-warning" onClick={(id) => this.remove(x._id)} role="button">Delete</a></td>
                                </tr>

                            })}
                        </tbody>
                    </table>
                    {/* {this.showAdd()} */}
                </div>
            </div>
        );
    }
}
