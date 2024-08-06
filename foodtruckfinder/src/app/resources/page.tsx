"use client";

import { ThemeProvider } from "@emotion/react";
import { Box, Stack } from "@mui/material";
import NavBar from "../_components/NavBar";
import Sidebar from "../_components/SideBar";
import { theme } from "../_components/theme";
import User from "../_components/User";

function Resources() {
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
              <h1>Resources</h1>
            </Box>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Resources;
