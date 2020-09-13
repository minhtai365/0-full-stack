import React, { Component } from 'react'
import ContentAdmin from './ContentAdmin'
import MenuAdmin from './MenuAdmin'

export default class Admin extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-2">
                    <MenuAdmin/>
                </div>
                <div className="col-9">
                    <ContentAdmin/>
                </div>
            </div>
        )
    }
}
