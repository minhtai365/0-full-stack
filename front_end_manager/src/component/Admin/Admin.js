import React from 'react'
import { Switch,Route, BrowserRouter } from 'react-router-dom'
import ContentAccount from './ContentAccount'
import ContentCatelogys from './ContentCatelogys'
import ContentProducts from './ContentProducts'
import ContentTypes from './ContentTypes'
import ContentOrder from './ContentOrder'
import ImgSlide from './ImgSlide'
import InfoAdmin from './InfoAdmin'

export default function Admin() {
    return (
        <BrowserRouter>
        {/* <Switch> */}
             <Route path="/admin" exact component={InfoAdmin} />
            <Route path="/admin/account.html" component={ContentAccount} />
            <Route path="/admin/types.html">
              <ContentTypes />
            </Route>
            <Route path="/admin/catelogys.html">
              <ContentCatelogys />
            </Route>
            <Route path="/admin/products.html">
              <ContentProducts />
            </Route>
            <Route path="/admin/orders.html">
              <ContentOrder />
            </Route>
            <Route path="/admin/imgslide.html">
              <ImgSlide />
            </Route>
        {/* </Switch> */}
        </BrowserRouter>
    )
}
