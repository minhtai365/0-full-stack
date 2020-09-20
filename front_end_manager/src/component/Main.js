import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import MainFilter from './MainFilter'
import MainRoot from './MainRoot'

export default class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                <Route path='/index' exact component={MainRoot}/>
                <Route path="/index/:slug/:id.html" component={MainFilter} />
                </Switch>
            </div>
        )
    }
}
