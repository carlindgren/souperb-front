import React from 'react';
import { Map, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import Routing from './RoutingMachine';
// https://api.mapbox.com/styles/v1/calle8/ckgi261np5spx19pazt1mnq7x/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2FsbGU4IiwiYSI6ImNrZ2kzbWdxeTAxMTMyd296Nnhwc2g0bXIifQ.dzyXClbi4cRjOYMTn-O2Fg
//mapbox://styles/calle8/ckgi261np5spx19pazt1mnq7x
import './Map.css';
export default class LeafletMap extends React.Component {
  state = {
    lat: 59.329323,
    lng: 18.068581,
    zoom: 13,
    isMapInit: false
  };
  saveMap = (map) => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };
  render() {
    const { latlng } = this.props;
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        scrollWheelZoom={false}
        center={position}
        zoom={this.state.zoom}
        ref={this.saveMap}
      >
        <TileLayer url='https://api.mapbox.com/styles/v1/calle8/ckgi2xhtm05vm19pe9x00riyg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2FsbGU4IiwiYSI6ImNrZ2kyMjk3NTBoZHoyeHFuOXphamJhdzgifQ.CHJcskJfSOEF08-fO2NKxg' />
        <Marker position={[59.33611, 18.06975]}>
          <Popup>Souperb HQ</Popup>
        </Marker>
        {this.state.isMapInit && latlng && (
          <Routing latlng={latlng && latlng} map={this.map} />
        )}
      </Map>
    );
  }
}

/*     
render() {
    return (
      <LeafletMap
        center={[59.329323, 18.068581]}
        zoom={13}
        fadeAnimation={true}
        zoomControl={false}
        attributionControl={false}
        doubleClickZoom={true}
        scrollWheelZoom={false}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url='https://api.mapbox.com/styles/v1/calle8/ckgi2xhtm05vm19pe9x00riyg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2FsbGU4IiwiYSI6ImNrZ2kyMjk3NTBoZHoyeHFuOXphamJhdzgifQ.CHJcskJfSOEF08-fO2NKxg' />

      </LeafletMap>
    );
  }
}
 */
