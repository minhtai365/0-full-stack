import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );
  
  class GoogleMap extends React.Component {
    static defaultProps = {
      center: {lat: 9.42, lng: 105.47},
      zoom: 15
    };
  
    render() {
      return (
        <div style={{ height: '15rem', width: '100%' }}>
         <GoogleMapReact 
         
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent 
            lat={9.4188477} 
            lng={105.4715769,8} 
            text="My Marker" 
          />
        </GoogleMapReact>
        </div>
      );
    }
  }
  export default GoogleMap
  