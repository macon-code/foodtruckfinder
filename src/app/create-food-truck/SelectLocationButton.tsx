"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop"; // For the pin icon button
import { Marker, Popup, TileLayer } from "react-leaflet"; // Import Leaflet
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { create } from "domain";
import { MapContainer, useMapEvents } from "react-leaflet";
import { center, customIcon, zoom } from "~/utils/map-utils";

interface SelectLocationButtonProps {
  onSelectLocation: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

const SelectLocationButton: React.FC<SelectLocationButtonProps> = ({
  onSelectLocation,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    if (selectedLocation) {
      onSelectLocation(selectedLocation.lat, selectedLocation.lng);
      handleClose();
    }
  };

  function MapClickHandler() {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setSelectedLocation({ lat, lng });
      },
    });
    return null; // This component doesn't render anything, it's just for event handling
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PinDropIcon />}
        onClick={handleOpen}
      >
        Select Location
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            padding: 4,
            width: "80%",
            maxWidth: 600,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Select a location on the map
          </Typography>
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ width: "100%", height: "500px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />

            <MapClickHandler />

            {selectedLocation && (
              <Marker
                position={[selectedLocation.lat, selectedLocation.lng]}
                icon={customIcon}
              >
                <Popup>
                  {selectedLocation.lat}, {selectedLocation.lng}
                </Popup>
              </Marker>
            )}
          </MapContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            fullWidth
          >
            Confirm Selection
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SelectLocationButton;
