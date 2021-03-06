import React from 'react';
import { useSelector } from 'react-redux';

function Carousel() {
    const data = useSelector(state =>state.getdata.dataslides)
    return (
        <div>
            <div className="container" style={{ paddingTop: '150px' }}>
                <div id="myslide" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myslide" data-slide-to={0} className="active" />
                        <li data-target="#myslide" data-slide-to={1} />
                        <li data-target="#myslide" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner" role="listbox">

                        {data.map((x, key) => {
                            var cl;
                            if (key === 0) {
                                cl = "carousel-item active"
                            }
                            else {
                                cl = 'carousel-item'
                            }
                            return <div key={key} className={cl}>
                                <div className="corou-my">
                                    <img src={x.imgslide} width="100%" height="300px" alt="First slide" />
                                </div>
                                <div className="carousel-caption d-none d-md-block">
                                    {/* <h3>Title</h3>
              <p>Description</p> */}
                                </div>
                            </div>
                        })}
                    </div>
                    <a className="carousel-control-prev" href="#myslide" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#myslide" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>

        </div>
    )
}
export default Carousel;
//     import Axios from 'axios'
// import React, { Component } from 'react'

// export default class Carousel extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: []
//         }
//     }
//     useEffect(() => {
//         Axios.get('/imgslide')
//             .then(res=>{
//                 this.setState({
//                     data: res.data
//                 })
//             });
//         return () => {
//             cleanup
//         }
//     }, [])
//     render() {
//         return (
//             <div>
//                 <div className="container" style={{ paddingTop: '150px' }}>
//                     <div id="myslide" className="carousel slide" data-ride="carousel">
//                         <ol className="carousel-indicators">
//                             <li data-target="#myslide" data-slide-to={0} className="active" />
//                             <li data-target="#myslide" data-slide-to={1} />
//                             <li data-target="#myslide" data-slide-to={2} />
//                         </ol>
//                         <div className="carousel-inner" role="listbox">

//                             {this.state.data.map((x, key) => {
//                                 var cl;
//                                 if(key===0){
//                                     cl="carousel-item active"
//                                 }
//                                 else{
//                                     cl ='carousel-item'
//                                 }
//                              return  <div key={key} className={cl}> 
//                              <div className="corou-my">
//                              <img src={x.imgslide} width="100%" height="300px" alt="First slide" />
//                              </div>
//                                     <div className="carousel-caption d-none d-md-block">
//                                         {/* <h3>Title</h3>
//               <p>Description</p> */}
//                                     </div>
//                                 </div>
//                             })}
//                         </div>
//                         <a className="carousel-control-prev" href="#myslide" role="button" data-slide="prev">
//                             <span className="carousel-control-prev-icon" aria-hidden="true" />
//                             <span className="sr-only">Previous</span>
//                         </a>
//                         <a className="carousel-control-next" href="#myslide" role="button" data-slide="next">
//                             <span className="carousel-control-next-icon" aria-hidden="true" />
//                             <span className="sr-only">Next</span>
//                         </a>
//                     </div>
//                 </div>

//             </div>
//         )
//     }
// }
