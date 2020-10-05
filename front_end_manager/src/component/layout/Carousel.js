import React, { Component } from 'react'

export default class Carousel extends Component {
    render() {
        return (
            <div>
                <div className="container" style={{ marginTop: '150px' }}>
                    <div id="myslide" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myslide" data-slide-to={0} className="active" />
                            <li data-target="#myslide" data-slide-to={1} />
                            <li data-target="#myslide" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <img src="https://ferosh.vn/upload/files/NTK/am-young.jpg " width="100%" height="300px" alt="First slide" />
                                <div className="carousel-caption d-none d-md-block">
                                    {/* <h3>Title</h3>
              <p>Description</p> */}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="https://ferosh.vn/upload/files/Banner-21six.jpg" width="100%" height="300px" alt="Second slide" />
                                <div className="carousel-caption d-none d-md-block">
                                    {/* <h3>Title</h3>
              <p>Description</p> */}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="https://ferosh.vn/upload/files/W2-10-NA-2000X668-02.jpg" width="100%" height="300px" alt="Third slide" />
                                <div className="carousel-caption d-none d-md-block">
                                    {/* <h3>Title</h3>
              <p>Description</p> */}
                                </div>
                            </div>
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
