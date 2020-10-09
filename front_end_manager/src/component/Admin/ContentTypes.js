import Axios from 'axios';
import React, { Component } from 'react'

import Model from 'react-modal';
import NavAdmin from './NavAdmin';
// import { Link } from 'react-router-dom';

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
        Axios.post('/types/add', {
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
            <NavAdmin />
            <div className="row mt-5 pt-4">
              {/* <div className="col-2">
                <MenuAdmin />
              </div> */}
        <div className="container">
                <Model
                    isOpen={this.state.isShow}
                    className="Modal"
                    overlayClassName="Overlay">
                    <div className="form-group">
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={() => this.changShow()} >X</button>
                        </div>
                        <label>Tên loại</label>
                        <input type="text"
                            className="form-control" onChange={this.ischange} name="typename" aria-describedby="helpId" defaultValue={this.state.typename} />

                        <button className="btn btn-primary" type="reset" onClick={this.setdata}>Add</button>
                    </div>
                </Model>

                <div className='container' id="modal">
                    <button className="btn btn-primary" onClick={()=>this.showModal('')}>Add</button>
        <table className="table table-bordered table-hover table-inverse table-responsive">
                        <thead className="thead-dark">
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
                                    <td>{x.createdlc}</td>
                                    <td><button className="btn btn-primary" onClick={(id) => this.showModal(x._id)}>Edit</button></td>
                                    <td><button className="btn btn-warning" onClick={(id) => this.remove(x._id)}>Delete</button></td>
                                </tr>

                            })}
                        </tbody>
                    </table>
                    {/* {this.showAdd()} */}
                </div>
            </div>
                </div>
                </div>
        );
    }
}
