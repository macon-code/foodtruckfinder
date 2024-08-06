"use client";

import FullWidthGrid from "./_components/FullWidthGrid";
import Cat from "./_components/Breeds";
import Listing from "./_components/Listing";
import Sidebar from "./_components/SideBar";
import { Box, Stack } from "@mui/material";
import NavBar from "./_components/NavBar";
import User from "./_components/User";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./_components/theme";

function App() {
  const listing = new Listing(
    0,
    "cat",
    "sweet cat needs new home",
    "Macon",
    "https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg",
    Cat.Maine_Coon.toString(),
    "@snubbulltrouble"
  );
  const props: Listing[] = [listing];
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
            <FullWidthGrid items={props}></FullWidthGrid>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
