import {createSlice} from '@reduxjs/toolkit';

const getdata=createSlice({
    name:'getdata',
    initialState:{
    dataproducts: [],
    datacates: [],
    datatypes: [],
    info:[],
    dataslides:[],
    dt:[],
    search: '',
    page: 1,
    },
    reducers:{
        getProducts:(state,action)=>{
            state.dataproducts=action.payload;
            state.dt=action.payload;
            state.search="" ;
        },
        getCates:(state,action)=>{
            state.datacates=action.payload;
        },
        getTypes:(state,action)=>{
            state.datatypes=action.payload;
        },
        getInfo:(state,action)=>{
            state.info=action.payload;
        },
        getSlides:(state,action)=>{
            state.dataslides=action.payload;
        },
        getPage:(state,action)=>{
            state.page=action.payload
        },
        getSearch:(state,action)=>{
            state.search=action.payload
        },
        getDt:(state,action)=>{
            state.dt=state.dataproducts.filter(x => x.catelogyid === action.payload);
            state.search="" 
        }
    }
});
const {reducer,actions}=getdata;
export const {getProducts,getTypes,getCates,getInfo,getSlides,getSearch,getDt,getPage}=actions;
export default reducer;