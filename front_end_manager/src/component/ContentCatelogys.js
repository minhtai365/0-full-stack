import Axios from 'axios';
import React, { Component } from 'react'

export default class ContentCatelogys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datacatelogys: [],
            datatypes: [],
            isShow: false
        }

    }
    componentWillMount() {
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
        Axios.get('/types')
            .then(res => {
                this.setState({
                    datatypes: res.data
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
                <label>Tên danh mục</label>
                <input type="text"
                    className="form-control" onChange={this.ischange} name="catelogy" aria-describedby="helpId" placeholder="" />
                <div className="form-group">

                    <label>Loại</label>
                    <select className="form-control" onChange={this.ischange} name="typeid" id="typeid">
                        {this.state.datatypes.map(x => {
                            return <option value={x._id}>{x.typename}</option>
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
        Axios.post('/addcatelogys', {
            catelogy: this.state.catelogy,
            typeid: this.state.typeid
        })
            .then(res => {
                if (res.data === 'create ok') {
                    alert("Thêm thành công");
                    Axios.get('/catelogys')
                        .then(res => {
                            this.setState({
                                datacatelogys: res.data
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
                    var catelogys = this.state.datacatelogys.filter(x => x._id !== id);
                    this.setState({
                        datacatelogys: catelogys
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
    //     Axios.post('/editcatelogys', {
    //         id: id
    //     })
    //         .then(res => {
    //             if (res.data === 'edit ok') {
    //                 Axios.get('/catelogys').then(res => {
    //                     this.setState({
    //                         datacatelogys: res.data
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
                                <th>Name</th>
                                <th>Type</th>
                                <th>Created</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.datacatelogys.map(x => {
                                return <tr>
                                    <td >{x.catelogy}</td>
                                    {this.state.datatypes.filter(y => y._id === x.typeid).map(z => {
                                        return <td>{z.typename}</td>
                                    })}
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
