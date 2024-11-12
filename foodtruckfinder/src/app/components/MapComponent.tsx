import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Spot, Location } from "./TruckList";
import FoodTruckCard from "./FoodTruckCard";

// Define the types for the props
interface Coordinate {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  spots: Spot[];
  setMapBounds: React.Dispatch<React.SetStateAction<MapBounds>>;
}

export type MapBounds = { minimumBound: Location; maximumBound: Location };

const MapComponent: React.FC<MapComponentProps> = ({ spots, setMapBounds }) => {
  // Set default center position to Macon, GA
  const center: [number, number] = [32.8407, -83.6324];

  // Create a custom icon for markers (optional)
  const customIcon = new L.Icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png", // Replace with your icon URL
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png", // Replace with your shadow URL
    shadowSize: [41, 41],
  });

  // Update bounds whenever the map view changes
  const MapBoundsHandler = () => {
    const map = useMap();

    useEffect(() => {
      const updateBounds = () => {
        const newBounds = map.getBounds();
        setMapBounds({
          minimumBound: {
            latitude: newBounds.getSouthWest().lat,
            longitude: newBounds.getSouthWest().lng,
          },
          maximumBound: {
            latitude: newBounds.getNorthEast().lat,
            longitude: newBounds.getNorthEast().lng,
          },
        });
      };

      map.on("moveend", updateBounds);
      return () => {
        map.off("moveend", updateBounds);
      };
    }, [map]);

    return null; // This component does not render anything
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <MapBoundsHandler />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {spots.map((spot: Spot, index) => (
        <Marker
          key={index}
          position={[spot.location.latitude, spot.location.longitude]}
          icon={customIcon}
        >
          <Popup>
            <FoodTruckCard spot={spot} height="50" width="30" />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
