import Axios from 'axios';
import React, { Component } from 'react'

export default class ContentProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataproducts: [],
            datacatelogys: [],
            isShow: false
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

    showAdd() {
        if (this.state.isShow) {
            return <div className="form-group">
                <label>Tên Sản phẩm</label>
                <input type="text"
                    className="form-control" onChange={this.ischange} name="title" aria-describedby="helpId" placeholder="" />

                <label>Mô tả</label>
                <input type="text"
                    className="form-control" onChange={this.ischange} name="description" aria-describedby="helpId" placeholder="" />

                <label>Giá</label>
                <input type="text"
                    className="form-control" onChange={this.ischange} name="price" aria-describedby="helpId" placeholder="" />

                <label>Giá sale</label>
                <input type="text"
                    className="form-control" onChange={this.ischange} name="sale" aria-describedby="helpId" placeholder="" />

                <label>Số lượng</label>
                <input type="text"
                    className="form-control" onChange={this.ischange} name="proNumber" aria-describedby="helpId" placeholder="" />
                <label>Hình ảnh</label>
                <input type="text"
                    className="form-control" onChange={this.ischange} name="imgPath" aria-describedby="helpId" placeholder="" />

                <label>Doanh mục</label>
                <div className="form-group">
                    <label htmlFor="typeid" />
                    <select className="form-control" onChange={this.ischange} name="catelogyid" id="typeid">
                        {this.state.datacatelogys.map(x => {
                            return <option value={x._id}>{x.catelogy}</option>
                        })}
                    </select>
                </div>

                <button class="btn btn-primary" type="reset" onClick={this.adddata} role="button">Add</button>
            </div>
        }
    }
    ischange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    adddata = () => {
        Axios.post('/addproducts', {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            sale: this.state.sale,
            imgPath: this.state.imgPath,
            proNumber: this.state.proNumber,
            catelogyid: this.state.catelogyid
        })
            .then(res => {
                if (res.data === 'create ok') {
                    alert("Thêm thành công");
                    Axios.get('/products')
                        .then(res => {
                            this.setState({
                                dataproducts: res.data
                            })
                        })
                }
                else alert(res.data)
            })
            .catch(err => {

                alert('Thất bại');
            }
            )
    }
    addtype = () => {
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

    // Edit = (id) => {
    //     console.log(id);
    //     Axios.post('/editproducts', {
    //         id: id
    //     })
    //         .then(res => {
    //             if (res.data === 'edit ok') {
    //                 Axios.get('/products').then(res => {
    //                     this.setState({
    //                         dataproducts: res.data
    //                     })
    //                 })
    //                 alert('Thành công');
    //             }
    //             else {
    //                 alert('Khóa thất bại');
    //             }
    //         })
    //         .catch(err => {
    //             alert('Khóa thất bại');
    //         })

    // }
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
                <div className='container'>
                    <a class="btn btn-primary" onClick={this.addtype} role="button">Add</a>
                    <table className="table table-striped table-inverse table-responsive">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Mô tả</th>
                                <th>Giá trước sale</th>
                                <th>Giá sau sale</th>
                                <th>Số lượng</th>
                                {/* <th>Loại doanh mục</th> */}
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
                                    {/* {this.state.datacatelogys.filter(y=>y._id===x.t).map(z=>{
                                        return <td>{z.typename}</td> })} */}
                                    <td>{x.created}</td>
                                    <td><a class="btn btn-primary" onClick={(id) => this.Edit(x._id)} role="button">Edit</a></td>
                                    <td><a class="btn btn-warning" onClick={(id) => this.remove(x._id)} role="button">Delete</a></td>
                                </tr>

                            })}
                        </tbody>
                    </table>
                    {this.showAdd()}
                </div>
            </div>
        );
    }
}
