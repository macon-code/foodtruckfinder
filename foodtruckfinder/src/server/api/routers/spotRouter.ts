import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Location, PrismaClient } from "@prisma/client";
import { Spot } from "~/utils/truckList-utils";

const prisma = new PrismaClient();

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

export const spotRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        distance: z.number().optional(),
        date: z.date().optional(),
        tags: z.array(z.string()).optional(),
        name: z.string().optional(),
        rating: z.number().min(0).max(5).optional(),
        category: z.string().optional(),
        latitude: z.number().optional(), // For distance filtering
        longitude: z.number().optional(), // For distance filtering
      })
    )
    .query(async ({ input }) => {
      let queryConditions: any = {};

      // Filtering by tags
      if (input.tags && input.tags.length > 0) {
        queryConditions.tags = { hasSome: input.tags };
      }

      // Filtering by name
      if (input.name) {
        queryConditions.name = { contains: input.name, mode: "insensitive" };
      }

      // Filtering by rating
      if (input.rating) {
        queryConditions.rating = { gte: input.rating };
      }

      // Filtering by category
      if (input.category) {
        queryConditions.category = input.category;
      }

      // Query Prisma for FoodTrucks that meet the conditions
      const foodTrucks = await prisma.foodTruck.findMany({
        where: queryConditions,
        include: {
          spots: {
            include: {
              location: true, // include location details
            },
          },
        },
      });

      // Distance filter logic if latitude, longitude, and distance are provided
      if (input.latitude && input.longitude && input.distance) {
        // Filter spots by distance from the given latitude and longitude
        foodTrucks.forEach((foodTruck) => {
          foodTruck.spots = foodTruck.spots.filter((spot) => {
            const distance = haversineDistance(
              input.latitude ? input.latitude : 0,
              input.longitude ? input.longitude : 0,
              spot.location.latitude,
              spot.location.longitude
            );
            return input.distance ? distance <= input.distance : 0; // Only include spots within the specified distance
          });
        });
      }

      // Filter spots by date if provided
      if (input.date) {
        foodTrucks.forEach((foodTruck) => {
          foodTruck.spots = foodTruck.spots.filter((spot) => {
            const spotDate = spot.date;
            return input.date
              ? spotDate.toISOString().split("T")[0] ===
                  input.date.toISOString().split("T")[0]
              : false;
          });
        });
      }

      // Flatten the spots and transform the structure into the Spot type
      const spots: Spot[] = [];

      foodTrucks.forEach((foodTruck) => {
        foodTruck.spots.forEach((spot) => {
          // Push each spot into the spots array, transforming it to match the Spot type
          spots.push({
            date: spot.date.getTime(), // Converting to timestamp (milliseconds)
            location: {
              latitude: spot.location.latitude,
              longitude: spot.location.longitude,
              //: spot.location.description, // optional
            },
            foodTruck: {
              name: foodTruck.name,
              homeCity: foodTruck.homeCity,
              tags: foodTruck.tags,
              rating: foodTruck.rating,
              category: foodTruck.category,
              thumbnail: foodTruck.thumbnail,
              description: foodTruck.description,
            },
          });
        });
      });

      return spots;
    }),

  // Add a new food truck
  createFoodTruck: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        category: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
        rating: z.number().min(0).max(5).optional(),
        thumbnail: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const foodTruck = await prisma.foodTruck.create({
        data: {
          homeCity: "",
          name: input.name,
          category: input.category,
          description: input.description,
          tags: input.tags?.join(", ") ?? "",
          rating: input.rating ?? 0,
          thumbnail: input.thumbnail ?? "",
        },
      });

      return foodTruck;
    }),

  // Add a new spot for an existing food truck
  createSpot: publicProcedure
    .input(
      z.object({
        foodTruckId: z.number(),
        location: z.object({
          latitude: z.number(),
          longitude: z.number(),
        }),
        date: z.date(),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Create a new location record
      const location = await prisma.location.create({
        data: {
          latitude: input.location.latitude,
          longitude: input.location.longitude,
        },
      });

      // Create a new spot linked to a food truck
      const spot = await prisma.spot.create({
        data: {
          date: input.date,
          foodTruckId: input.foodTruckId,
          locationId: location.id, // Link spot to location
          description: input.description,
        },
      });

      return spot;
    }),
});
