import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const LocationSelector = ({ turf, setTurf }) => {
  // Extract existing location or set default
  const [position, setPosition] = useState(
    turf?.location?.lat && turf?.location?.lng
      ? [parseFloat(turf.location.lat), parseFloat(turf.location.lng)]
      : [20, 78] // Default center
  );

  useEffect(() => {
    if (turf?.location?.lat && turf?.location?.lng) {
      setPosition([parseFloat(turf.location.lat), parseFloat(turf.location.lng)]);
    }
  }, [turf]);

  const handleMapClick = (e) => {
    const newLocation = { lat: e.latlng.lat.toFixed(6), lng: e.latlng.lng.toFixed(6) };
    setPosition([newLocation.lat, newLocation.lng]);
    setTurf({ ...turf, location: newLocation });
  };

  return (
    <div>
      <label>Location (Click on Map):</label>
      <input type="text" value={`${position[0]}, ${position[1]}`} readOnly required />
      <MapContainer center={position} zoom={10} className="map-container">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler onClick={handleMapClick} />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
};

const MapClickHandler = ({ onClick }) => {
  useMapEvents({ click: onClick });
  return null;
};

export default LocationSelector;
