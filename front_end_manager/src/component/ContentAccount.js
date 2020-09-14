import Axios from 'axios';
import React, { Component } from 'react';
export default class ContentAccount extends Component {
  constructor(props) {
    super(props);
    this.state={
      datauser:[]
    }
    
  }
  componentWillMount(){
    Axios.get('/user')
    .then(res=>{
        this.setState({
            datauser:res.data
        })
    })
    .catch(err=>{
        console.log(err);
    }
        )
}
  remove=(id)=>{
    Axios.post('/remove',{
      id:id
    })
    .then(res=>{
      if(res.data==="remove ok"){
        var user=this.state.datauser.filter(x=>x._id!==id);
        this.setState({
          datauser:user
        })
        alert("Xóa thành công");
      }
      else{
        alert("Lỗi hệ thống");
      }
    })
    .catch(err=>{
      alert(err);
    })
  }

  lock=(id)=>{
    Axios.post('/change',{
      id:id
    })
    .then(res=>{
      if(res.data==='lock ok'){
        Axios.get('/user').then(res=>{
        this.setState({
          datauser:res.data
          })
        })
        alert('Thành công');
      }
      else{
        alert('Khóa thất bại');
      }
    })
    .catch(err=>{
      alert('Khóa thất bại rồi ' + err);
    })

  }
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
          <a  class="btn btn-primary" role="button">Add</a>
        <table className="table table-striped table-inverse table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.datauser.map(x => {
              return <tr>
                <td >{x.name}</td>
                <td>{x.username}</td>
                <td>{x.email}</td>
                <td>{x.role}</td>
                <td>{x.created}</td>
                {x.status ?  
                <td><a class="btn btn-primary" onClick={(id)=>this.lock(x._id)} role="button">Open</a></td>: 
                <td><a class="btn btn-danger" onClick={(id)=>this.lock(x._id)} role="button">Lock</a></td>}
                <td><a class="btn btn-warning" onClick={(id)=>this.remove(x._id)} role="button">Delete</a></td>
              </tr>

            })}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}