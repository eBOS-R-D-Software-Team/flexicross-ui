import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  type: string;
  geometry: {
    type: string;
    coordinates: [[number, number]];
  };
  properties?: {
    detectionConfidence: number;
    trackingConfidence: number;
  };
}

interface MapComponentProps {
  locations: Location[];
  center: any;
}

const MapComponent: React.FC<MapComponentProps> = ({ locations,center }) => {
//   locations=[{
//     geometry: {
//         coordinates: [
//              23.784161159985374,
//                 37.97927915998538
//             ,

//         ],
//         type: "LineString"
//     },
//     type: "Feature"
// }];
  console.log("received locations in map component: ", locations);

  return (
    <MapContainer center={[center[1], center[0]]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        noWrap={true}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        noWrap={true}
        url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
        maxZoom={20}
        subdomains={['mt1', 'mt2', 'mt3']}
        zIndex={10}
      />
      {locations.map((location, index) => (
        <>{location &&
          <Marker
            position={[location.geometry.coordinates[0][1], location.geometry.coordinates[0][0]]}
            icon={L.icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            {/* <Popup>
            {location.properties.detectionConfidence && <span>Detection Confidence: {location.properties.detectionConfidence}</span>}
            <br />
            
            {location.properties.trackingConfidence && <span>Tracking Confidence: {location.properties.trackingConfidence}</span>}

          </Popup> */}
          </Marker>}</>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
