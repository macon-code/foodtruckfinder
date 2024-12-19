"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import UserIconWithMenu from "./UserIconWithMenu"; // Assuming this is another custom component for the user icon.
import Link from "next/link";

interface AppBarHeaderProps {
  searchQuery?: string; // Optional prop
  handleSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional prop
  handleSearchSubmit?: () => void; // Optional prop
}

const AppBarHeader: React.FC<AppBarHeaderProps> = ({
  searchQuery = "", // Default value for searchQuery if not provided
  handleSearchChange = () => {}, // Default function if not provided
  handleSearchSubmit = () => {}, // Default function if not provided
}) => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Function to toggle the visibility of the drawer
  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* Update onClick to call toggleNav */}
          <IconButton edge="start" color="inherit" onClick={toggleNav}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Macon Food Truck Finder
          </Typography>
          {/* TODO: Revisit doing a search page
          <InputBase
            placeholder="Search…"
            value={searchQuery}
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
          */}
          <UserIconWithMenu />
        </Toolbar>
      </AppBar>

      {/* Drawer component */}
      <Drawer anchor="left" open={isNavVisible} onClose={toggleNav}>
        <List>
          <Link href="/">
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link href="/about">
            <ListItem button>
              <ListItemText primary="About" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemText primary="Services" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Contact" />
          </ListItem>
          <Link href="/create-food-truck" passHref>
            <ListItem button>
              <ListItemText primary="Create Spot" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
};

export default AppBarHeader;
