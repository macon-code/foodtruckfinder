// Define the types
//export type FoodTruckCategory = "truck" | "stand" | "restaurant" | "popup";

export type FoodTruck = {
  name: string;
  homeCity: string;
  tags: string;
  rating: number;
  category: string;
  thumbnail: string;
  description: string;
};

export type Location = {
  latitude: number;
  longitude: number;
  description?: string;
};

export type Spot = {
  date: number;
  location: Location;
  foodTruck: FoodTruck;
};
