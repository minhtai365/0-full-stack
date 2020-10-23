import React,{ useState } from "react";
import {Pagination} from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
import { getPage } from "../../reduxtoolkit/sliceReducer/dataSlice";

 function Paginationn(props) {
    const dispatch = useDispatch();
    const dt = useSelector(state => state.getdata.dt);
    const dataproducts = useSelector(state => state.getdata.dataproducts);
    const datacates = useSelector(state => state.getdata.datacates);
    const search = useSelector(state => state.getdata.search);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
      
    dispatch(getPage(value));
    };
    
    var mydt = [];
    var cate = datacates.filter(x => x.typeid === props.id);
    cate.forEach(cate => {
        dt.forEach(pro => {
            if (pro.catelogyid === cate._id) {
                mydt.push(pro);
            }
        })
    });
    if (mydt.length === 0) {
        cate.forEach(cate => {
            dataproducts.forEach(pro => {
                if (pro.catelogyid === cate._id) {
                    mydt.push(pro);
                }
            })
        });
    }
    if(props.id==='1'){
        mydt=dt
    }
    
    if(props.id==='0'){
        mydt=dataproducts.filter(y =>y.title.toLowerCase().indexOf(search) !== -1)
        
    }
    return (
      <div >
        {/* <Typography>Page: {page}</Typography> */}
        {/* mydt.length%4===0? mydt.length/4: */}
        <Pagination count={ mydt.length % 6===0? mydt.length/6:parseInt(mydt.length/6)+1} page={page} onChange={handleChange} />
      </div>
    );
  }
 
export default Paginationn
