import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ImgMediaCard from "./ListingCard";
import type Listing from "./Listing";

interface Props {
  items: Listing[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid({ items }: Props) {
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Grid container spacing={0}>
        {items.map((item, index) => (
          <Grid key={index}>
            <Item>
              <ImgMediaCard listing={item}></ImgMediaCard>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
