import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(59.33611, 18.06975), L.latLng(59.30694, 17.99504)],
      geometryOnly: true
    }).addTo(map.leafletElement);
    leafletElement.hide();
    return leafletElement.getPlan();
  }
}

export default withLeaflet(Routing);
