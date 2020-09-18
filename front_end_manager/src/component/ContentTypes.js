import Axios from 'axios';
import React, { Component } from 'react'

import Model from 'react-modal';

export default class ContentTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datatypes: [],
            isShow: false,
            // _id:''
        }

    }
    componentWillMount() {
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

    componentDidMount() {
        Model.setAppElement("#modal");
    }
    ischange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    setdata = () => {
        Axios.post('/addtypes', {
            _id:this.state._id,
            typename: this.state.typename
        })
            .then(res => {
                if (res.data === 'create ok'||res.data==="edit ok") {
                    alert("Thành công");
                    Axios.get('/types')
                        .then(res => {
                            this.setState({
                                datatypes: res.data
                            })
                        })
                }
                else alert("Thất bại")
            })
            .catch(err => {

                alert('Thất bại');
            }
            )
            this.changShow();
    }
    changShow() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    showModal = (id) => {
        if(id!==''){
            this.state.datatypes.forEach(item=>{
                if(item._id===id){
                    this.setState({
                        _id:item._id,
                        typename:item.typename
                    })
                }
            })
        }else{
            this.setState({
                _id:'',
                typename:''
            })
        }
        this.changShow();
    }
    remove = (id) => {
        Axios.post('/remove', {
            id: id
        })
            .then(res => {
                if (res.data === "remove ok") {
                    var types = this.state.datatypes.filter(x => x._id !== id);
                    this.setState({
                        datatypes: types
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
                            <a className="nav-link dropdown-toggle ml-auto"  id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tài khoản</a>
                            <div className="dropdown-menu" aria-labelledby="dropdownId">
                                <a className="dropdown-item" >Đăng xuất</a>
                                <a className="dropdown-item" >Thông tin</a>
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
                        <label>Tên loại</label>
                        <input type="text"
                            className="form-control" onChange={this.ischange} name="typename" aria-describedby="helpId" defaultValue={this.state.typename} />

                        <button class="btn btn-primary" type="reset" onClick={this.setdata} role="button">Add</button>
                    </div>
                </Model>

                <div className='container' id="modal">
                    <a class="btn btn-primary" onClick={()=>this.showModal('')} role="button">Add</a>
                    <table className="table table-striped table-inverse table-responsive">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Created</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.datatypes.map(x => {
                                return <tr>
                                    <td >{x.typename}</td>
                                    <td>{x.created}</td>
                                    <td><a class="btn btn-primary" onClick={(id) => this.showModal(x._id)} role="button">Edit</a></td>
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
