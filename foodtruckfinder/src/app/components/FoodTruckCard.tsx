import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Spot } from "./TruckList";

interface FoodTruckCardProps {
  spot: Spot;
  height?: string;
  width?: string;
}

export const FoodTruckCard: React.FC<FoodTruckCardProps> = ({
  spot,
  height,
  width,
}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height={height ?? "140"}
        width={width}
        image={spot.foodTruck.thumbnail}
        alt={spot.foodTruck.name}
      />
      <CardContent>
        <Typography variant="h5">{spot.foodTruck.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {spot.foodTruck.description}
        </Typography>
        <Typography variant="body1">Rating: {spot.foodTruck.rating}</Typography>
        <Typography variant="body2">
          Tags:{" "}
          {Array.isArray(spot.foodTruck.tags)
            ? spot.foodTruck.tags.join(", ")
            : spot.foodTruck.tags}
        </Typography>
        <Typography variant="body2">
          Coordinates: {spot.location.latitude}, {spot.location.longitude}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FoodTruckCard;
