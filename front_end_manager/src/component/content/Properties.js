import Axios from 'axios'
import React, { Component } from 'react'
import Footer from '../layout/Footer'
import Header from '../layout/Header'

export default class Properties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dt: [],
            showEditPass:false
        }
    }

    componentWillMount() {
        Axios.get('user')
            .then(re => {
                var dt = re.data.filter(x => x._id === sessionStorage.getItem('userID'));
                this.setState({
                    cmnd: dt[0].cmnd,
                    phone: dt[0].phone,
                    address: dt[0].address,
                    quan: dt[0].quan,
                    tp: dt[0].tp,
                    name: dt[0].name
                })
            })
    }
    ischange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    isClickSave = () => {
        const { phone, address, quan, tp, cmnd, name } = this.state;
        Axios.post('/user/setinfo', {
            id: sessionStorage.getItem('userID'),
            cmnd: cmnd,
            phone: phone,
            address: address,
            quan: quan,
            tp: tp,
            name: name
        })
            .then(res => {
                alert(res.data.mess)
            })
    }
    isClickEdit = () => {
        this.setState({
            showEditPass: !this.state.showEditPass
        })
    }
    isClickChange=()=>{
        
        if(this.state.pass===undefined||this.state.newpass===undefined){
            alert('Vui lòng nhập toàn bộ các trường')
        }
        else if(this.state.newpass !== this.state.repass){
            alert("Mật khẩu chưa khớp!!!")
        }
        else{
            Axios.post('/user/changepass',{
                id:sessionStorage.getItem('userID'),
                pass:this.state.pass,
                newpass:this.state.newpass
            })
            .then(res=>{
                alert(res.data.mess);
            })
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        
    }
    render() {
        return (
            <div>
                <Header />
                <div className="content-chitiet">
                    <div className="container">
                        <h5 className="display-4 text-left">Thông tin cá nhân</h5>
                        <hr className="my-2" />
                    </div>
                </div>
                <div className="container">
                    {!this.state.showEditPass &&

                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="form-group ">
                                    <label >Tên</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => this.ischange(e)} name="name" defaultValue={this.state.name} />
                                </div>
                                <div className="form-group">
                                    <label >Số điện thoại</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => this.ischange(e)} name="phone" defaultValue={this.state.phone} />
                                </div>
                                <div className="form-group">
                                    <label >Số CMND</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => this.ischange(e)} name="cmnd" defaultValue={this.state.cmnd} />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label >Số nhà</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => this.ischange(e)} name="address" defaultValue={this.state.address} />
                                </div>
                                <div className="form-group">
                                    <label >Quận/Huyện</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => this.ischange(e)} name="quan" defaultValue={this.state.quan} />
                                </div>
                                <div className="form-group">
                                    <label >Thành phố/Tỉnh</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => this.ischange(e)} name="tp" defaultValue={this.state.tp} />
                                </div>

                            </div>

                        </div>}
                    {this.state.showEditPass &&

                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="form-group ">
                                    <label >Mật khẩu cũ</label>
                                    <input type="password"
                                        className="form-control" onChange={(e) => this.ischange(e)} name="pass" />
                                </div>
                                <div className="form-group">
                                    <label >Mật khẩu mới</label>
                                    <input type="password"
                                        className="form-control" onChange={(e) => this.ischange(e)} name="newpass" />
                                </div>
                                <div className="form-group">
                                    <label >Nhập lại mật khẩu mới</label>
                                    <input type="password"
                                        className="form-control" onChange={(e) => this.ischange(e)} name="repass"  />
                                </div>
                                
                        <div className='d-flex justify-content-end'>
                                <button className="btn btn-info" onClick={() => this.isClickEdit()}>Hủy</button>
                                <button className="btn btn-primary" onClick={() => this.isClickChange()}>Lưu</button>
                                </div> 
                                </div>

                        </div>}

                    {/* <div className='d-flex justify-content-start'>
                       
                    </div> */}

                    {!this.state.showEditPass &&

                        <div className='d-flex justify-content-end'><button className="btn btn-danger" onClick={() => this.isClickEdit()}>Đổi mật khẩu</button>
                            <button className="btn btn-primary" onClick={() => this.isClickSave()}>Lưu</button>
                        </div>}
                </div>
                <Footer />
            </div>
        )
    }
}
