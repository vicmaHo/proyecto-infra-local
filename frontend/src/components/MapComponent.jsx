import React from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../Styles/MapComponent.css';




const MapComponent = ({ position }) => {
  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <Marker position={position}>
            
            
          <Popup>
            Aquí está la propiedad.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
