import { Spot } from "./truckList-utils";

export type Event = {
  name: string;
  organizer: string;
  date: Date;
  location: Location;
  foodTruckSpots: Spot;
  description: string;
};
