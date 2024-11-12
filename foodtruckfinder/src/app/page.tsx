"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import UserIconWithMenu from "./components/UserIconWithMenu";
import { trpc, trpcClient } from "../utils/trpc-utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewTrucks } from "./components/ViewTrucks";

const App: React.FC = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [tClient] = useState(trpcClient);

  const [isNavVisible, setIsNavVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <trpc.Provider client={tClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={toggleNav}>
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
              <UserIconWithMenu />
            </Toolbar>
          </AppBar>

          <Drawer anchor="left" open={isNavVisible} onClose={toggleNav}>
            <List>
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Services" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Contact" />
              </ListItem>
            </List>
          </Drawer>

          <ViewTrucks />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
