// import axios from 'axios';
import { createStore } from 'redux';
const oldState = {
    dt: [],
    dataproducts: [],
    datacates: [],
    datatypes: [],
    info: [],
    // username:'',
    search: ''
}
const myReducer = (state = oldState, action) => {
    switch (action.type) {
        case 'GET_ID_CATELOGY':
            return Object.assign({}, state, { dt: state.dataproducts.filter(x => x.catelogyid === action.id), search: "" })
        case "GET_DATA_PRODUCTS":
            return { ...state, dataproducts: action.data, dt: action.data, search: '' }
        case "GET_DATA_CATELOGYS":
            return { ...state, datacates: action.dt }
        case "GET_DATA_TYPES":
            return { ...state, datatypes: action.dt }
        case "GET_DATA_SEARCH":
            return { ...state, search: action.data }
            case "GET_DATA_INFO":
                return { ...state, info: action.dt }
        default:
            return state
    }
}


// const getproduct = () => axios.get('/products').then(res => res.data)
const Store = createStore(myReducer);
export default Store;