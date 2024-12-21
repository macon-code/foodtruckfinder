import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
} from "@mui/material";
import FoodTruckCard from "./FoodTruckCard";
import { MapBounds } from "./MapComponent";
import { FoodTruck, Spot } from "~/utils/truckList-utils";
import Link from "next/link";

interface Props {
  spots: Spot[];
  mapBounds?: MapBounds;
}

// Define the component
export function FoodTruckList({ spots, mapBounds }: Props) {
  const [sortKey, setSortKey] = useState<keyof FoodTruck | "date">("name");
  const [filterText, setFilterText] = useState("");

  //function to filter out of bounds
  const spotsToShow = mapBounds
    ? spots.filter(
        (spot) =>
          spot.location.latitude >= mapBounds.minimumBound.latitude &&
          spot.location.latitude <= mapBounds?.maximumBound.latitude &&
          spot.location.longitude >= mapBounds.minimumBound.longitude &&
          spot.location.longitude <= mapBounds?.maximumBound.longitude
      )
    : spots;

  // Function to handle sorting
  const sortedSpots = [...spotsToShow].sort((a, b) => {
    if (sortKey === "date") {
      return a.date - b.date;
    }

    const aValue = a.foodTruck[sortKey];
    const bValue = b.foodTruck[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return aValue - bValue;
    }
    return 0;
  });

  // Function to filter spots
  const filteredSpots = sortedSpots.filter(
    (spot) =>
      spot.foodTruck.name.toLowerCase().includes(filterText.toLowerCase()) /*||
      spot.foodTruck.tags.some((tag) =>
        tag.toLowerCase().includes(filterText.toLowerCase())
      )*/
  );

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Food Truck List
        </Typography>
        <Link href="/create-food-truck" passHref>
          <Button
            variant="contained"
            color="primary"
            style={{
              marginLeft: "16px", // Optional, just to add some space between the text and the button
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            +
          </Button>
        </Link>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <TextField
          label="Filter by name or tags"
          variant="outlined"
          style={{ flex: 1, marginRight: "16px" }} // Allow TextField to take available space
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <FormControl
          variant="outlined"
          style={{ minWidth: "120px" }} // Set a minimum width to avoid collapsing
        >
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortKey}
            onChange={(e) =>
              setSortKey(e.target.value as keyof FoodTruck | "date")
            }
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="category">Category</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Box
        style={{
          maxHeight: "500px", // Set maximum height for the scrollable area
          overflowY: "auto", // Enable vertical scrolling
          padding: "16px", // Optional padding for spacing
          border: "1px solid #ccc", // Optional border for visibility
          borderRadius: "8px", // Optional rounded corners
        }}
      >
        <Grid container spacing={2}>
          {filteredSpots.map((spot) => (
            <Grid item xs={12} sm={6} md={4} key={spot.foodTruck.name}>
              <FoodTruckCard spot={spot} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default FoodTruckList;
