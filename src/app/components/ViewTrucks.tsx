import { trpc } from "~/utils/trpc-utils";
import MapComponent from "./MapComponent";
import FoodTruckList from "./TruckList";
import { useState, useEffect } from "react";
import { Spot } from "~/utils/truckList-utils";

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

  // Use effect to filter spots whenever the searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = spots.filter((spot) => {
        // Split the tags string into an array and check if any tag matches the search term
        const tagsArray = spot.foodTruck.tags.split(","); // Assuming tags are stored as a comma-separated string
        const matchesSearchTerm =
          spot.foodTruck.name.toLowerCase().includes(lowercasedQuery) ||
          spot.foodTruck.category.toLowerCase().includes(lowercasedQuery) ||
          tagsArray.some((tag) => tag.toLowerCase().includes(lowercasedQuery));
        return matchesSearchTerm;
      });
      setFilteredSpots(filtered);
    } else {
      setFilteredSpots(spots); // If no search term, show all spots
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
          <MapComponent spots={filteredSpots} setMapBounds={setMapBounds} />
        </div>
        <div style={{ flex: "1", marginLeft: "16px" }}>
          <FoodTruckList spots={filteredSpots} mapBounds={mapBounds} />
        </div>
      </div>
    </main>
  );
};
