import Axios from 'axios';
import React, { Component } from 'react'

export default class ContentTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datatypes: [],
            isShow:false
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

    showAdd(){
        if(this.state.isShow){
            return <div className="form-group">
              <label>Tên loại</label>
              <input type="text"
                className="form-control" onChange={this.ischange} name="typename" aria-describedby="helpId" placeholder=""/>
            
                <button  class="btn btn-primary" type="reset" onClick={this.adddata} role="button">Add</button>
            </div>
        }
    }
    ischange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    adddata=()=>{
        Axios.post('/addtypes',{
            typename:this.state.typename
        })
        .then(res=>{
            if(res.data==='create ok'){
                alert("Thêm thành công");
                Axios.get('/types')
                .then(res=>{
                this.setState({
                    datatypes:res.data
                })
                })
            } 
            else alert("Thất bại")
        })
        .catch(err=>{
            
            alert('Thất bại');
        }
        )
    }
    addtype=()=>{
        this.setState({
            isShow:!this.state.isShow
        })
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

    // Edit = (id) => {
    //     console.log(id);
    //     Axios.post('/edittypes', {
    //         id: id
    //     })
    //         .then(res => {
    //             if (res.data === 'edit ok') {
    //                 Axios.get('/types').then(res => {
    //                     this.setState({
    //                         datatypes: res.data
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
