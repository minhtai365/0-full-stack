import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// const getproduct = () => axios.get('/products').then(res => res.data)
class Main extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    // componentWillMount() {
    //     getproduct().then(res => {
    //         this.props.sendProducts(res);
    //     });
    // }
    loadProducts() {
        return (
            this.props.dt.map((x, key) =>
                <div key={key} className="col-lg-4 col-md-6 col-12 mt-3">
                    <div className="card" style={{ height: '100%' }}>
                        <Link to="/detail.html">
                            <img className="card-img-top" src={x.imgPath} alt="" />
                            <div className="card-body">
                                <h4 className="card-title">{x.title}</h4>
                                <strike className="card-text">{x.price} VND</strike>
                                <p className="card-text text-danger">{x.sale} VND || Giảm {parseInt(x.price - x.sale) / x.price * 100}%</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        )
    }
    render() {
        return (
            <div >
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">

                        <h5 className="display-3 text-center">Trang phục</h5>
                        <hr className="my-2" />
                    </div>
                </div>

                <div className="container">
                    <div className="col-3" style={{ float: 'left' }}>
                        <div className="list-group ">
                            {this.props.datacates.map((x, key) => (
                                <a key={key} className="dropdown-item border-left border-bottom" 
                                onClick={() => this.props.clickItem(x._id)} >{x.catelogy}</a>))}
                            
                        </div>
                    </div>
                    <div className="col-9" style={{ float: 'right' }}>
                        <div className="row">
                            {this.loadProducts()}
                        </div>
                    </div>

                </div>
                <div className="clearfix" />
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        dt: state.dt,
        datacates: state.datacates,
        datatypes: state.datatypes
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clickItem: (id) => {
            dispatch({ type: 'GET_ID_CATELOGY', id: id })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)