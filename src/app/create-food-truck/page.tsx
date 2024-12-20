"use client";

import React, { useState } from "react";
import { Button, TextField, Typography, Grid, Box, Paper } from "@mui/material";
import "leaflet/dist/leaflet.css";
import SelectLocationButton from "./SelectLocationButton";
import Link from "next/link";
import { trpc } from "~/utils/trpc-utils";
import AppBarHeader from "../components/AppBarHeader";

const CreateFoodTruckSpot: React.FC = () => {
  // State for form inputs
  const [foodTruckName, setFoodTruckName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [homeCity, setHomeCity] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const createMutation = trpc.spot.createSpotWithTruck.useMutation();

  // Handler to capture selected location coordinates
  const handleLocationSelection = (lat: number, lng: number) => {
    setSelectedCoordinates({ lat, lng });
  };

  const validString = (field: string) => {
    return field.replace(" ", "").length > 0;
  };

  // Function to handle the form submission
  const handleSubmit = () => {
    if (
      !validString(foodTruckName) ||
      !validString(tags) ||
      !validString(homeCity) ||
      !validString(category) ||
      !validString(description) ||
      !validString(notes) ||
      !selectedCoordinates ||
      !selectedDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    const createInput = {
      foodTruckName: foodTruckName,
      homeCity: homeCity,
      tags: tags,
      category: category,
      description: description,
      selectedDate: selectedDate,
      selectedCoordinates: {
        lat: selectedCoordinates.lat,
        lng: selectedCoordinates.lng,
      },
      selectedIcon: selectedIcon,
      notes: notes,
    };

    try {
      const newSpot = createMutation.mutate(createInput);
      console.log("New Spot Created:", newSpot);
    } catch (error) {
      console.error("Error creating spot:", error);
    }
  };

  return (
    <>
      <AppBarHeader />
      <Box
        sx={{
          padding: "30px",
          maxWidth: "900px",
          margin: "auto",
          marginTop: "64px", // Added margin-top to avoid content being hidden behind AppBar
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Create a New Food Truck Spot
        </Typography>

        <Paper sx={{ padding: "20px", borderRadius: 2, boxShadow: 3 }}>
          <Grid container spacing={3}>
            {/* Food Truck Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Food Truck Name"
                variant="outlined"
                fullWidth
                value={foodTruckName}
                onChange={(e) => setFoodTruckName(e.target.value)}
                required
              />
            </Grid>

            {/* Home City */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Home City"
                variant="outlined"
                fullWidth
                value={homeCity}
                onChange={(e) => setHomeCity(e.target.value)}
                required
              />
            </Grid>

            {/* Tags */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tags (e.g., tacos, burritos)"
                variant="outlined"
                fullWidth
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>

            {/* Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            {/* Icon URL */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Icon URL"
                variant="outlined"
                fullWidth
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
              />
            </Grid>

            {/* Location Selection */}
            <Grid item xs={12}>
              <SelectLocationButton
                onSelectLocation={handleLocationSelection}
              />
            </Grid>

            {/* Location Notes */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location Notes"
                variant="outlined"
                fullWidth
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>

            {/* Displaying Selected Coordinates */}
            <Grid item xs={12}>
              {selectedCoordinates ? (
                <Typography variant="body1" color="textSecondary">
                  Selected Coordinates: {selectedCoordinates.lat},{" "}
                  {selectedCoordinates.lng}
                </Typography>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No location selected yet.
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={
                !selectedCoordinates ||
                !foodTruckName ||
                !category ||
                !description ||
                !selectedDate
              }
              sx={{ width: "48%" }}
            >
              Submit Spot
            </Button>
            <Link href="/" passHref>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ width: "48%" }}
              >
                Cancel
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default CreateFoodTruckSpot;
