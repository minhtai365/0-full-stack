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
        <div className='container'>
          <button  className="btn btn-primary" >Add</button>
        <table className="table table-bordered table-hover table-inverse table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.datauser.map((x,key) => {
              return <tr key={key}>
                <td >{x.name}</td>
                <td>{x.username}</td>
                <td>{x.email}</td>
                <td>{x.role}</td>
                <td>{x.created}</td>
                {x.status ?  
                <td><button className="btn btn-primary" onClick={(id)=>this.lock(x._id)}>Open</button></td>: 
                <td><button className="btn btn-danger" onClick={(id)=>this.lock(x._id)}>Lock</button></td>}
                <td><button className="btn btn-warning" onClick={(id)=>this.remove(x._id)}>Delete</button></td>
              </tr>

            })}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}