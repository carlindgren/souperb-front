import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';
import { HQ } from '../../../StaticContent/StaticContent';
class Routing extends MapLayer {
  createLeafletElement() {
    //userAdress should be something like userAdress = [24324,32434]
    const { map, latlng } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(HQ.latlong[0], HQ.latlong[1]),
        L.latLng(latlng[0], latlng[1])
      ],
      lineOptions: {
        styles: [
          { color: 'black', opacity: 0.15, weight: 9 },
          { color: 'white', opacity: 0.8, weight: 6 },
          { color: '#436F8A', weight: 2.5 }
        ]
      },
      geometryOnly: true
    }).addTo(map.leafletElement);
    leafletElement.hide();

    return leafletElement.getPlan();
  }
}

export default withLeaflet(Routing);
