import dynamic from "next/dynamic";
import { trpc } from "~/utils/trpc-utils";
import FoodTruckList from "./TruckList";
import { useState, useEffect } from "react";
import { Spot } from "~/utils/truckList-utils";

const DynamicMapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

interface ViewTrucksProps {
  searchQuery: string;
}

export const ViewTrucks: React.FC<ViewTrucksProps> = ({ searchQuery }) => {
  const { data, isLoading, isError, error } = trpc.spot.getAll.useQuery({});
  const spots = data as Spot[];

  const [filteredSpots, setFilteredSpots] = useState<Spot[]>(spots);

  const [mapBounds, setMapBounds] = useState({
    minimumBound: { latitude: 90, longitude: 180 },
    maximumBound: { latitude: -90, longitude: -180 },
  });

  // Filter spots based on the search query
  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = spots.filter((spot) => {
        const tagsArray = spot.foodTruck.tags.split(",");
        return (
          spot.foodTruck.name.toLowerCase().includes(lowercasedQuery) ||
          spot.foodTruck.category.toLowerCase().includes(lowercasedQuery) ||
          tagsArray.some((tag) => tag.toLowerCase().includes(lowercasedQuery))
        );
      });
      setFilteredSpots(filtered);
    } else {
      setFilteredSpots(spots);
    }
  }, [searchQuery, spots]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!filteredSpots || filteredSpots.length === 0) {
    return <div>No spots found</div>;
  }

  return (
    <main style={{ padding: "16px", marginTop: "64px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: "1" }}>
          <h1>Interactive Map</h1>
          <DynamicMapComponent spots={filteredSpots} setMapBounds={setMapBounds} />
        </div>
        <div style={{ flex: "1", marginLeft: "16px" }}>
          <FoodTruckList spots={filteredSpots} mapBounds={mapBounds} />
        </div>
      </div>
    </main>
  );
};
