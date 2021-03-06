import Axios from 'axios';
import React, { Component } from 'react'
import { Pagination } from '@material-ui/lab';
import Model from 'react-modal';
import NavAdmin from './NavAdmin';
export default class ContentProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataproducts: [],
            datacatelogys: [],
            isShow: false,
            _id: '',
            page: 1
        }
    }
    componentWillMount() {
        Axios.get('/products')
            .then(res => {
                this.setState({
                    dataproducts: res.data
                })
            })
        Axios.get('/catelogys')
            .then(res => {
                this.setState({
                    datacatelogys: res.data
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
    setData = () => {
        Axios.post('/products/add', {
            _id: this.state._id,
            title: this.state.title,
            type: this.state.type,
            color: this.state.color,
            size: this.state.size,
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
                        type: element.type,
                        size: element.size,
                        price: element.price,
                        sale: element.sale,
                        proNumber: element.proNumber,
                        imgPath: element.imgPath,
                        color: element.color,
                        catelogyid: element.catelogyid
                    })
                }
            });
        } else {
            this.setState({
                _id: '',
                title: '',
                type: '',
                size: '',
                price: '',
                sale: '',
                proNumber: '',
                imgPath: '',
                color: '',
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
    inputValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    find = (e) => {
        if (e.key === "Enter") {
            var dt = [];
            Axios.get('/products')
                .then(res => {
                    res.data.forEach(x => {
                        if (x.title.toLowerCase().indexOf(this.state.search) !== -1) {
                            dt.push(x);
                        }
                    })
                    this.setState({
                        dataproducts: dt
                    })
                })
        }
    }
    clicksearch = () => {
        var dt = [];
        Axios.get('/products')
            .then(res => {
                res.data.forEach(x => {
                    if (x.title.toLowerCase().indexOf(this.state.search) !== -1) {
                        dt.push(x);
                    }
                })
                this.setState({
                    dataproducts: dt
                })
            })
    }
    clickredo = () => {
        Axios.get('/products')
            .then(res => {
                this.setState({
                    dataproducts: res.data
                })
            })

    }
    ischose = (e) => {
        var id = e.target.value;
        if (id === 'Loại') {
            Axios.get('/products')
                .then(res => {
                    this.setState({
                        dataproducts: res.data
                    })
                })
        }
        else
            Axios.get('/products')
                .then(res => {
                    this.setState({
                        dataproducts: res.data.filter(x => x.catelogyid === id)
                    })
                })
    }
    handleChange = (event, value) => {
        this.setState({
            page: value
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
                            <div className=" d-flex justify-content-end">
                                <button className="text-danger " onClick={() => this.changShow()} ><i className="far fa-times-circle"></i></button>

                            </div>
                            <label>Tên Sản phẩm</label>
                            <input type="text"
                                className="form-control" onChange={this.ischange} name="title" aria-describedby="helpId" defaultValue={this.state.title || ""} />

                            <div className="form-group d-flex">
                                <div>
                                    <label>Kích thước</label>
                                    <input type="text"
                                        className="form-control" onChange={this.ischange} name="size" aria-describedby="helpId" defaultValue={this.state.size || ""} />
                                </div>
                                <div>
                                    <label>Chất liệu</label>
                                    <input type="text"
                                        className="form-control" onChange={this.ischange} name="type" aria-describedby="helpId" defaultValue={this.state.type || ""} />
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <div>
                                    <label>Màu sắc</label>
                                    <input type="text"
                                        className="form-control" onChange={this.ischange} name="color" aria-describedby="helpId" defaultValue={this.state.color || ""} />
                                </div>
                                <div>
                                    <label>Số lượng</label>
                                    <input type="text"
                                        className="form-control" onChange={this.ischange} name="proNumber" aria-describedby="helpId" defaultValue={this.state.proNumber || ""} />
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <div>
                                    <label>Giá</label>
                                    <input type="text" className="form-control" onChange={this.ischange} name="price" aria-describedby="helpId" defaultValue={this.state.price || ""} />
                                </div>
                                <div>
                                    <label>Giá sale</label>
                                    <input type="text" className="form-control" onChange={this.ischange} name="sale" aria-describedby="helpId" defaultValue={this.state.sale || ""} />
                                </div>
                            </div>


                            <label>Hình ảnh</label>
                            <input type="text"
                                className="form-control" onChange={this.ischange} name="imgPath" aria-describedby="helpId" defaultValue={this.state.imgPath || ""} />

                            <label>Doanh mục</label>
                            <div className="form-group">
                                <select className="form-control" defaultValue={this.state.catelogyid} onChange={this.ischange} name="catelogyid" id="typeid">
                                    {this.state.datacatelogys.map((x, key) => {
                                        return <option key={key} value={x._id}>{x.catelogy}</option>
                                    })}
                                </select>
                            </div>

                            <button className="btn btn-primary" type="reset" onClick={this.setData} >OK</button>
                        </div>
                    </Model>

                    <div className='container' id="modal">
                        <button className="btn btn-primary" onClick={() => this.showModel('')} ><i className="fas fa-plus-circle"></i></button>
                        <div className="content-right d-flex justify-content-end">
                            <span className="form-inline  p-1">
                                <div className=" sea  fas fa-redo text-dark" onClick={() => this.clickredo()}></div>
                                <input className=" sea  shadow-none mr-sm-2 px-3 border-0 fff" name="search" onKeyDown={(e) => this.find(e)} onChange={(e) => this.inputValue(e)} type="text" placeholder="Nhập tên sản phẩm cần tìm ...." />
                                <div className=" sea  fas fa-search text-dark" onClick={() => this.clicksearch()}></div>

                            </span>
                        </div>
                        <table className="table table-bordered table-hover table-inverse table-responsive">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Màu sắc</th>
                                    <th>Kích cỡ</th>
                                    <th>Chất liệu</th>
                                    <th>Giá</th>
                                    <th>Sale</th>
                                    <th>Số lượng</th>
                                    <th width="15%">
                                        <div className="form-group">
                                            <select onChange={(e) => this.ischose(e)} className="form-control" name="typed">
                                                <option >Loại</option>
                                                {this.state.datacatelogys.map((x, key) => {
                                                    return <option key={key} value={x._id}>{x.catelogy}</option>
                                                })}
                                                {/* <option>Ngày đặt</option>
                                                <option>Ngày nhận</option>
                                                <option>Ngày bàn giao</option>
                                                <option>Ngày hủy</option> */}
                                            </select>
                                        </div>
                                    </th>
                                    <th>Lượt xem</th>
                                    {/* <th>Created</th> */}
                                    <th></th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dataproducts.slice((this.state.page - 1) * 5, this.state.page * 5).map((x, k) => {
                                    return <tr key={k}>
                                        <td ><img src={x.imgPath} width={50} alt="Hình ảnh sản phẩm" /></td>
                                        <td>{x.title}</td>
                                        <td>{x.color}</td>
                                        <td>{x.size}</td>
                                        <td>{x.type}</td>
                                        <td>{x.price}</td>
                                        <td>{x.sale}</td>
                                        <td>{x.proNumber}</td>
                                        {this.state.datacatelogys.filter(y => y._id === x.catelogyid).map((z, k) => {
                                            return <td key={k}>{z.catelogy}</td>
                                        })}
                                        <td>{x.view}</td>
                                        {/* <td>{x.created}</td> */}
                                        <td><div className="text-info" onClick={(id) => this.showModel(x._id)} ><i className="fas fa-edit"></i></div>
                                            <hr />
                                            <div className="text-danger" onClick={(id) => this.remove(x._id)} ><i className="far fa-trash-alt"></i></div></td>
                                        {/* <td></td> */}
                                    </tr>

                                })}
                            </tbody>
                        </table>
                    </div>

                    
                </div>
                <div className="d-flex justify-content-end">
                        <Pagination count={parseInt(this.state.dataproducts.length / 5) + 1} page={this.state.page} onChange={this.handleChange} />
                    </div>
            </div>
        );
    }
}
