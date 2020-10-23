import Axios from 'axios';
import React, { Component } from 'react';

import Model from 'react-modal';
import NavAdmin from './NavAdmin';

export default class ContentCatelogys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datacatelogys: [],
            datatypes: [],
            isShow: false,
            _id: ''
        }

    }
    componentWillMount() {
        Axios.get('/catelogys')
            .then(res => {
                this.setState({
                    datacatelogys: res.data
                })
            })
        Axios.get('/types')
            .then(res => {
                this.setState({
                    datatypes: res.data
                })
            })
    }
    componentDidMount() {
        Model.setAppElement("#modal");
    }

    ischange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    setdata = () => {

        Axios.post('/catelogys/add', {
            _id: this.state._id,
            catelogy: this.state.catelogy,
            typeid: this.state.typeid
        })
            .then(res => {
                if (res.data === 'create ok' || res.data === "edit ok") {
                    alert("Thành công");
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
        this.setState({
            isShow: !this.state.isShow
        })
    }
    showModal = (id) => {
        if (id !== '') {
            this.state.datacatelogys.forEach(item => {
                if (item._id === id) {
                    this.setState({
                        _id: item._id,
                        catelogy: item.catelogy,
                        typeid: item.typeid

                    })
                }
            })
        } else {
            this.setState({
                _id: '',
                catelogy: '',
                typeid: ''

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

    render() {
        return (
            <div>
                <NavAdmin />
                <div className="row mt-5 pt-4">
                    {/* <div className="col-2">
                        <MenuAdmin />
                    </div> */}
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
                                <button className="btn btn-primary" onClick={() => this.changShow()} >X</button>
                            </div>
                            <label>Tên danh mục</label>
                            <input type="text"
                                className="form-control" onChange={this.ischange} name="catelogy" aria-describedby="helpId" defaultValue={this.state.catelogy} />
                            <div className="form-group">

                                <label>Loại</label>
                                <select className="form-control" defaultValue={this.state.typeid} onChange={this.ischange} name="typeid" id="typeid">
                                    {this.state.datatypes.map(x => {
                                        return <option value={x._id}>{x.typename}</option>
                                    })}
                                </select>
                            </div>

                            <button className="btn btn-primary" type="reset" onClick={this.setdata}>Add catelogy</button>
                        </div>
                    </Model>

                    <div className='container' id="modal">
                        <button className="btn btn-primary" onClick={() => this.showModal("")}>Add</button>
                        <table className="table table-bordered table-hover table-inverse table-responsive">
                            <thead className="thead-dark">
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
                                        <td>{x.createdlc}</td>
                                        <td><button className="btn btn-primary" onClick={(id) => this.showModal(x._id)}>Edit</button></td>
                                        <td><button className="btn btn-warning" onClick={(id) => this.remove(x._id)}>Delete</button></td>
                                    </tr>

                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
