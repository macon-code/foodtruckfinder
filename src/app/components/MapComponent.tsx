import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Spot } from "~/utils/truckList-utils"; // Assuming the Spot type is already defined
import FoodTruckCard from "./FoodTruckCard";
import { center, customIcon } from "~/utils/map-utils";

// Define the MapBounds type
export type MapBounds = {
  minimumBound: { latitude: number; longitude: number };
  maximumBound: { latitude: number; longitude: number };
};

interface MapComponentProps {
  spots: Spot[];
  setMapBounds: React.Dispatch<React.SetStateAction<MapBounds>>;
}

const MapComponent: React.FC<MapComponentProps> = ({ spots, setMapBounds }) => {
  // Update bounds based on map movements
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
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {spots.map((spot, index) => (
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
