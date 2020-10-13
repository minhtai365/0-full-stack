import Axios from 'axios';
import React, { Component } from 'react'

import Model from 'react-modal';
import NavAdmin from './NavAdmin';

export default class ImgSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgdata: [],
            isShow: false,
            // _id:''
        }

    }
    componentWillMount() {
        Axios.get('/imgslide')
            .then(res => {
                this.setState({
                    imgdata: res.data
                })
            })
            .catch(err => {
                console.log(err);
            }
            )
    }
    ischange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    setdata = () => {
        Axios.post('/imgslide/add', {
            _id:this.state._id,
            urlimg: this.state.urlimg
        })
            .then(res => {
                if (res.data === 'create ok'||res.data==="edit ok") {
                    alert("Thành công");
                    Axios.get('/imgslide')
                        .then(res => {
                            this.setState({
                                imgdata: res.data
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
            this.state.imgdata.forEach(item=>{
                if(item._id===id){
                    this.setState({
                        _id:item._id,
                        urlimg:item.imgslide
                    })
                }
            })
        }else{
            this.setState({
                _id:'',
                urlimg:''
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
                    var imgslide = this.state.imgdata.filter(x => x._id !== id);
                    this.setState({
                        imgdata: imgslide
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
              
        <div className="container">
                <Model
                    isOpen={this.state.isShow}
                    className="Modal"
                    overlayClassName="Overlay">
                    <div className="form-group">
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={() => this.changShow()} >X</button>
                        </div>
                        <label>URL hình ảnh</label>
                        <input type="text"
                            className="form-control" onChange={this.ischange} name="urlimg" aria-describedby="helpId" defaultValue={this.state.urlimg} />

                        <button className="btn btn-primary" type="reset" onClick={this.setdata}>Add</button>
                    </div>
                </Model>

                <div className='container' id="modal">
                    <button className="btn btn-primary" onClick={()=>this.showModal('')}>Add</button>
        <table className="table table-bordered table-hover table-inverse table-responsive">
                        <thead className="thead-dark">
                            <tr>
                                <th>Hình</th>
                                <th>Created</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.imgdata.map(x => {
                                return <tr>
                                    <td ><img src={x.imgslide} width='500' alt="Hình"/></td>
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
