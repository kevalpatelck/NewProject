import React from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

const LocationSelector = ({ turf, setTurf }) => {
  const handleMapClick = (e) => {
    setTurf({ ...turf, latitude: e.latlng.lat, longitude: e.latlng.lng });
  };

  return (
    <div>
      <label>Location (Click on Map):</label>
      <input type="text" value={`${turf.latitude} ${turf.longitude}`} readOnly required />
      <MapContainer center={[20, 78]} zoom={5} className="map-container">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler onClick={handleMapClick} />
      </MapContainer>
    </div>
  );
};

const MapClickHandler = ({ onClick }) => {
  useMapEvents({ click: onClick });
  return null;
};

export default LocationSelector;
