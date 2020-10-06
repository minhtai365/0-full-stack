import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Boxicon from '../layout/Boxicon'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
class Order extends Component {
    render() {
        return (  
        <div>
            <Header />
                
                <hr />
                <Boxicon />
                <Footer />
            </div>
        )
    }
}
export default withRouter(Order)