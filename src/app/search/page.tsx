"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import the Next.js useRouter hook
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import UserIconWithMenu from "../components/UserIconWithMenu";

const SearchPage: React.FC = () => {
  const router = useRouter(); // Use the useRouter hook for navigation
  const [searchTerm, setSearchTerm] = useState("");

  // Handle the search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle the search submission
  const handleSearchSubmit = () => {
    // Redirect to the main page and pass the search term as a query parameter
    if (searchTerm) {
      router.push(`/search?page=1&search=${encodeURIComponent(searchTerm)}`); // You can change the URL structure as needed
    }
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Macon Food Truck Finder
          </Typography>
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={handleSearchChange}
            inputProps={{ "aria-label": "search" }}
            style={{
              color: "white",
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "4px",
              padding: "0.5rem",
            }}
          />
          <Button onClick={handleSearchSubmit} color="inherit">
            Search
          </Button>
          <UserIconWithMenu />
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: "64px", padding: "16px" }}>
        {/* Page content goes here */}
        <Typography variant="h5">Search Results</Typography>
        {/* Implement further search results or display logic */}
      </Box>
    </div>
  );
};

export default SearchPage;
