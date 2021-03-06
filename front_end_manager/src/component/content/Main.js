import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainFilter from './MainFilter'
import MainRoot from './MainRoot'
import ResultSearch from './ResultSearch'

export default function Main() {
        return (
            <div>
                
                <Switch>
                <Route path='/index' exact component={MainRoot}/>
                <Route path='/index/search' component={ResultSearch}/>
                <Route path="/index/:slug/:id.html" component={MainFilter} />
                </Switch>
            </div>
        )
    }

