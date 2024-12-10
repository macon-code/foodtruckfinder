"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AppBarHeader from "./components/AppBarHeader"; // Import the AppBarHeader component
import { ViewTrucks } from "./components/ViewTrucks";

const MainPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Ensure that router-related hooks are only called on the client side
  useEffect(() => {
    const searchParam = new URLSearchParams(window.location.search).get(
      "search"
    );
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery) {
      router.push(`/search?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBarHeader
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />

      <ViewTrucks searchQuery={searchQuery} />
    </div>
  );
};

export default MainPage;
