import {configureStore} from '@reduxjs/toolkit';
import getdataReducer from '../sliceReducer/dataSlice';
const rootReducer={

    getdata:getdataReducer
}
const Store = configureStore({
    reducer:rootReducer,
})
export default Store