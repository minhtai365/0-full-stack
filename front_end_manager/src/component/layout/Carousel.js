import Axios from 'axios'
import React, { Component } from 'react'

export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        var dt = async () => {
            var data = await Axios.get('/imgslide');
            //  console.log(data.data);
            this.setState({
                data: data.data
            })
            return data.data;
        }
        console.log(dt());

    }
    render() {
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

                            {this.state.data.map((x, key) => {
                                if(key===0){
                                    var cl="carousel-item active"
                                }
                                else{
                                    var cl ='carousel-item'
                                }
                             return  <div key={key} className={cl}>
                                    <img src={x.imgslide} width="100%" height="300px" alt="First slide" />
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
}
