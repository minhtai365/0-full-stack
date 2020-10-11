import React,{ useState } from "react";
import {Pagination} from '@material-ui/lab';
import { connect } from "react-redux";

 function Paginationn(props) {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    
    var mydt = [];
    var cate = props.datacates.filter(x => x.typeid === props.id);


    cate.forEach(cate => {
        props.dt.forEach(pro => {
            if (pro.catelogyid === cate._id) {
                mydt.push(pro);
            }
        })
    });
    if (mydt.length === 0) {
        cate.forEach(cate => {
            props.dataproducts.forEach(pro => {
                if (pro.catelogyid === cate._id) {
                    mydt.push(pro);
                }
            })
        });
    }
    if(props.id==='1'){
        mydt=props.dt
    }
    
    if(props.id==='0'){
        mydt=props.dataproducts.filter(y =>y.title.toLowerCase().indexOf(props.search) !== -1)
        
    }
    props.dataPagin(page);
    // console.log(mydt);
    return (
      <div >
        {/* <Typography>Page: {page}</Typography> */}
        {/* mydt.length%4===0? mydt.length/4: */}
        <Pagination count={ mydt.length % 6===0? mydt.length/6:parseInt(mydt.length/6)+1} page={page} onChange={handleChange} />
      </div>
    );
  }
  const mapStateToProps = (state, ownProps) => {
    return {
        dt: state.dt,
        dataproducts: state.dataproducts,
        datacates: state.datacates,
        datatypes: state.datatypes,
        search: state.search
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dataPagin: (page) => {
            dispatch({type:'DATA_FROM_PAGIN',page})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Paginationn)
