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
      center: {lat: 16.0682953, lng: 108.1794317},
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
            lat={16.0682953} 
            lng={108.1794317} 
            text="My Marker" 
          />
        </GoogleMapReact>
        </div>
      );
    }
  }
  export default GoogleMap
  