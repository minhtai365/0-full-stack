import axios from 'axios';
import { createStore } from 'redux';
const oldState = {
    dt: [],
    dataproducts: [],
    datacates:[],
    datatypes:[]
}
const myReducer = (state = oldState, action) => {
    switch (action.type) {
        case 'GET_ID_CATELOGY':
            return Object.assign({},state,{dt:state.dataproducts.filter(x => x.catelogyid === action.id) })
        case "GET_DATA_PRODUCTS":
            return { ...state, dataproducts: action.data,dt: action.data}
        case "GET_DATA_CATELOGYS":
            return { ...state, datacates: action.dt }
        case "GET_DATA_TYPES":
            return { ...state, datatypes: action.dt }
        case "GET_DATA_PRODUCT":
            return Object.assign({}, state, { dataproducts: state.dataproducts.filter(x => x.catelogyid === '5f63711da80df62cd894d85c') })
        default:
            return state
    }
}


const getproduct = () => axios.get('/products').then(res => res.data)
const Store = createStore(myReducer);
export default Store;