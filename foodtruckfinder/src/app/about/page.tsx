"use client";

import { ThemeProvider } from "@emotion/react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import Link from "next/link";
import NavBar from "../_components/NavBar";
import Sidebar from "../_components/SideBar";
import User from "../_components/User";
import { theme } from "../_components/theme";

export default function About() {
  const user = new User(
    "@snubbulltrouble",
    "Macon",
    ["God", "Emporer", "King"],
    "profile_pic.png"
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <NavBar user={user}></NavBar>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar></Sidebar>
            <Box flex={4} p={{ xs: 0, md: 2 }}>
              <h1>Purpose</h1>
              <p>Purpose TBD</p>
              <h1>Goal</h1>
              <p>TBD</p>
              <h1>How to use the site</h1>
              <p>TBD</p>
              <h1>Who We Are</h1>
              <p>TBD</p>
              <Link href="/" passHref legacyBehavior>
                <Button variant="contained" color="primary">
                  Click Here to Search for Pets
                </Button>
              </Link>
            </Box>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
}
