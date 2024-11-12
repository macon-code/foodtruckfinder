import { trpc } from "~/utils/trpc-utils";
import MapComponent from "./MapComponent";
import FoodTruckList from "./TruckList";
import { useState } from "react";
import { Spot } from "~/utils/truckList-utils";

/* Usage:
const filteredSpots: { data; isLoading; error } =
  trpc.spot.getAll.useQuery({
    // Optional filters
    distance: 10,
    date: new Date(),
    tags: ["vegan", "spicy"],
    rating: 4,
    category: "Tacos",
    latitude: 32.0836,
    longitude: -83.6242,
  });*/

export const ViewTrucks = () => {
  const { data, isLoading, isError, error } = trpc.spot.getAll.useQuery({});
  const spots = data as Spot[];

  const [mapBounds, setMapBounds] = useState({
    minimumBound: { latitude: 90, longitude: 180 },
    maximumBound: { latitude: -90, longitude: -180 },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No spots found</div>;
  }

  return (
    <main style={{ padding: "16px", marginTop: "64px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: "1" }}>
          <h1>Interactive Map</h1>
          <MapComponent spots={spots} setMapBounds={setMapBounds} />
        </div>
        <div style={{ flex: "1", marginLeft: "16px" }}>
          <FoodTruckList spots={spots} mapBounds={mapBounds} />
        </div>
      </div>
    </main>
  );
};
