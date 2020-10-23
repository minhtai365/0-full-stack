import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from 'react-loading-screen'

export default function Properties() {
    const [inputvalue, setinputvalue] = useState({});
    const [showEditPass, setShowEditPass] = useState(false)
    const [isload, setisload] = useState(true)
    useEffect(() => {
        Axios.post('/user', {
            id: sessionStorage.getItem('userID')
        })
            .then(re => {
                setinputvalue(re.data);
                setisload(false)
            })
        window.scrollTo(0, 0)
    }, [])

    const ischange = (e) => {
        setinputvalue({ ...inputvalue, [e.target.name]: e.target.value });
    }
    const isClickSave = () => {
        const { phone, address, quan, tp, cmnd, name } = inputvalue;
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
    const isClickEdit = () => {
        setShowEditPass(!showEditPass);
    }
    const isClickChange = () => {

        if (inputvalue.pass === undefined || inputvalue.newpass === undefined) {
            alert('Vui lòng nhập toàn bộ các trường')
        }
        else if (inputvalue.newpass !== inputvalue.repass) {
            alert("Mật khẩu chưa khớp!!!")
        }
        else {
            Axios.post('/user/changepass', {
                id: sessionStorage.getItem('userID'),
                pass: inputvalue.pass,
                newpass: inputvalue.newpass
            })
                .then(res => {
                    alert(res.data.mess);
                })
        }
    }
    return (
        <LoadingScreen
            loading={isload}
            bgColor='#f1f1f1'
            spinnerColor='#9ee5f8'
            textColor='#676767'
            logoSrc='/logo.png'
            text='Loading.............'
        >
            <div>
                <div className="content-chitiet">
                    <div className="container">
                        <h5 className="display-4 text-left">Thông tin cá nhân</h5>
                        <hr className="my-2" />
                    </div>
                </div>
                <div className="container">
                    {!showEditPass &&

                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="form-group ">
                                    <label >Tên</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => ischange(e)} name="name" defaultValue={inputvalue.name} />
                                </div>
                                <div className="form-group">
                                    <label >Số điện thoại</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => ischange(e)} name="phone" defaultValue={inputvalue.phone} />
                                </div>
                                <div className="form-group">
                                    <label >Số CMND</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => ischange(e)} name="cmnd" defaultValue={inputvalue.cmnd} />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label >Số nhà</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => ischange(e)} name="address" defaultValue={inputvalue.address} />
                                </div>
                                <div className="form-group">
                                    <label >Quận/Huyện</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => ischange(e)} name="quan" defaultValue={inputvalue.quan} />
                                </div>
                                <div className="form-group">
                                    <label >Thành phố/Tỉnh</label>
                                    <input type="text"
                                        className="form-control" onChange={(e) => ischange(e)} name="tp" defaultValue={inputvalue.tp} />
                                </div>

                            </div>

                        </div>}
                    {showEditPass &&

                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="form-group ">
                                    <label >Mật khẩu cũ</label>
                                    <input type="password"
                                        className="form-control" onChange={(e) => ischange(e)} name="pass" />
                                </div>
                                <div className="form-group">
                                    <label >Mật khẩu mới</label>
                                    <input type="password"
                                        className="form-control" onChange={(e) => ischange(e)} name="newpass" />
                                </div>
                                <div className="form-group">
                                    <label >Nhập lại mật khẩu mới</label>
                                    <input type="password"
                                        className="form-control" onChange={(e) => ischange(e)} name="repass" />
                                </div>

                                <div className='d-flex justify-content-end'>
                                    <button className="btn btn-info" onClick={() => isClickEdit()}>Hủy</button>
                                    <button className="btn btn-primary" onClick={() => isClickChange()}>Lưu</button>
                                </div>
                            </div>

                        </div>}

                    {!showEditPass &&

                        <div className='d-flex justify-content-end'><button className="btn btn-danger" onClick={() => isClickEdit()}>Đổi mật khẩu</button>
                            <button className="btn btn-primary" onClick={() => isClickSave()}>Lưu</button>
                        </div>}
                </div>
            </div>
        </LoadingScreen>
    )
}

