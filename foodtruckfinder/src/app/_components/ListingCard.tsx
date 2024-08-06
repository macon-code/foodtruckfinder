import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type Listing from "./Listing";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

interface Props {
  listing: Listing;
}

export default function ImgMediaCard(props: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="https://i.fbcd.co/products/resized/resized-750-500/cat-logogg-4cb401da7857674df5308bca301d118285e85a62d863cd39ad404d71300d9cc3.jpg"
        height="140"
        image={props.listing.getImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.listing.getName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.listing.getDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
