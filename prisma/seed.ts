import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Function to generate test spots
const generateTestSpots = () => {
  const categories: string[] = ["truck", "stand", "restaurant", "popup"];
  const names: string[] = [
    "Macon Tacos",
    "BBQ Bliss",
    "The Sweet Spot",
    "Bite Me Burgers",
    "Soul Food Express",
    "Pizza Paradise",
    "Pasta Peddler",
    "Cajun Cruiser",
    "Vegan Delight",
    "Sushi on Wheels",
    "Curry in a Hurry",
    "Doughnut Den",
    "Fried Rice Truck",
    "Mac and Cheese Masters",
    "Wrap It Up",
    "Crepe Cafe",
    "Gourmet Grilled Cheese",
    "Ice Cream Dream",
    "Noodle Nirvana",
    "Boba Bliss",
    "Waffle Wagon",
    "Taco Trio",
    "The Brunch Box",
    "Smoothie Stop",
    "Pasta Palooza",
    "Caribbean Cravings",
    "Street Eats",
    "The Coffee Cart",
    "Savory Snacks",
    "Gatsby's Grub",
    "Brewed Awakenings",
    "The Cheese Board",
    "Fried Chicken Fiesta",
    "Pork Perfection",
    "Meatball Madness",
    "Crispy Cart",
    "Chili Chompers",
    "The Hot Dog Stand",
    "Macon Market",
    "Tasty Tapas",
    "Delicious Deli",
    "Nashville Hot Chicken",
    "Gourmet Gyros",
    "Frosty Frappes",
    "Spicy Tacos",
    "The Wrap Shack",
    "Smoothie Sensation",
  ];

  const descriptions: string[] = [
    "Fresh and delicious tacos with a twist!",
    "BBQ smoked to perfection.",
    "A sweet escape with our gourmet desserts.",
    "Juicy burgers with unique toppings.",
    "Authentic southern soul food on the go.",
    "Pizza made fresh in a wood-fired oven.",
    "Homemade pasta served right from our truck.",
    "Spicy and savory cajun dishes.",
    "Delicious vegan options for all appetites.",
    "Fresh sushi rolls on the road.",
    "Curries from around the world, served hot.",
    "Decadent doughnuts for every craving.",
    "Stir-fried rice with fresh ingredients.",
    "Creamy mac and cheese, a comfort classic.",
    "Wraps filled with fresh and flavorful ingredients.",
    "Sweet and savory crepes.",
    "Grilled cheese sandwiches that warm the soul.",
    "Ice cream made from scratch.",
    "Noodles from various cultures served quick and hot.",
    "Boba tea with unique flavors.",
    "Crispy waffles served with a variety of toppings.",
    "Tacos that will make you crave more.",
    "Brunch favorites served all day long.",
    "Healthy smoothies for a quick boost.",
    "A pasta lover's dream with a variety of dishes.",
    "Tasty Caribbean flavors in every bite.",
    "Street food inspired by global cuisine.",
    "Freshly brewed coffee and pastries.",
    "Savory snacks that satisfy any craving.",
    "Classic dishes with a modern twist.",
    "A variety of deli sandwiches made fresh.",
    "Fried chicken with southern flair.",
    "Italian meatballs in marinara sauce served warm.",
    "Crispy fried snacks and more.",
    "Chili to warm your soul on a cold day.",
    "Hot dogs with creative toppings.",
    "Macon's finest food market on wheels.",
    "Tapas-style dishes for sharing.",
    "A deli experience on the go with fresh ingredients.",
    "Nashville-style hot chicken.",
    "Gyros that transport you straight to Greece.",
    "Frappe delights for any season.",
    "Spicy tacos with a twist of flavor.",
    "Unique wraps with global inspirations.",
    "A refreshing smoothie truck for all tastes.",
  ];

  const sampleIcons: string[] = [
    "https://cdn-icons-png.flaticon.com/512/683/683071.png",
    "https://static.vecteezy.com/system/resources/previews/013/219/837/non_2x/food-truck-icon-on-white-background-street-food-wagon-sign-foodtruck-logo-symbol-flat-style-vector.jpg",
    "https://cdn-icons-png.flaticon.com/512/1046/1046762.png",
    "https://e7.pngegg.com/pngimages/502/287/png-clipart-computer-icons-food-truck-car-food-truck-food-orange-thumbnail.png",
    "https://media.istockphoto.com/id/472291069/vector/food-truck-text.jpg?s=612x612&w=0&k=20&c=UBGUvvKLssus6jcbUdiDWRHZJc28JUXHObTwmU7jFoM=",
    "https://www.pngkey.com/png/detail/514-5146171_food-truck-icon-foodtruck-png.png",
    "https://media.lordicon.com/icons/wired/outline/1927-food-truck.svg",
  ];

  const maconGaLocations: string[] = [
    "Downtown Macon",
    "Ocmulgee Mounds National Historical Park",
    "The Allman Brothers Band Museum at The Big House",
    "Macon City Auditorium",
    "Central City Park",
    "The Georgia Sports Hall of Fame",
    "Rose Hill Cemetery",
    "The Georgia Children's Museum",
    "Tubman Museum",
    "Macon Museum of Arts and Sciences",
    "Fort Hawkins",
    "Lake Tobesofkee",
    "Amerson River Park",
    "The Mercer University Campus",
    "Tattnall Square Park",
    "Macon Mall",
    "Mulberry Street",
    "Washington Park",
    "Piedmont Arts Center",
    "Macon Little Theatre",
    "The Macon Terminal Station",
    "The Hay House",
    "Historic Vineville District",
    "Indian Mounds Park",
    "The Macon Coliseum",
    "The Grand Opera House",
    "Cannonball House & Museum",
    "Macon County",
    "Macon's Historic District",
    "Echeconnee Creek Park",
    "High Falls State Park",
    "Sandersville Road",
    "The Riverside Cemetery",
    "Georgia Music Hall of Fame",
    "Lake Juliette",
    "Middle Georgia State University",
    "The 1916 Macon City Hall",
    "The Macon War Memorial",
    "Macon Bibb County Library",
    "Macon Beer Company",
    "The Cotton Avenue",
    "Macon's Cherry Street",
    "The Pink Palace",
    "The Whitehall Historic District",
    "Hartley Bridge Road",
    "The International City Golf Club",
    "The Museum of Aviation",
    "The Peach Outlet Mall",
    "Pine Knoll Country Club",
    "The Middle Georgia Regional Airport",
    "Macon National Cemetery",
    "Dannelly Field",
    "Macon's Historic Railroad Depot",
  ];

  const spots = Array.from({ length: 50 }, (_, index) => {
    const location = {
      longitude: parseFloat(
        (-83.6324 + (Math.random() * 0.1 - 0.05)).toFixed(6)
      ), // Random longitude
      latitude: parseFloat((32.8407 + (Math.random() * 0.1 - 0.05)).toFixed(6)), // Random latitude
      description: maconGaLocations[index] ? maconGaLocations[index] : "N/A",
    };

    return {
      date: Date.now() + index * 86400000, // Different dates for each spot
      location: location,
      foodTruck: {
        name: names[index % names.length] ?? "test name",
        homeCity: "Macon, GA",
        tags: ["popular", "local", "foodie", "street food"], // Tags are non-null
        rating: parseFloat((Math.random() * 10).toFixed(1)), // Random rating between 0 and 10
        category: categories[index % categories.length] ?? "truck",
        thumbnail:
          sampleIcons[Math.floor(Math.random() * sampleIcons.length)] ?? "",
        description: descriptions[index % descriptions.length] ?? "description",
      },
    };
  });

  return spots;
};

async function main() {
  const testSpots = generateTestSpots();

  // Create an array of promises
  const promises = testSpots.map((spot) => {
    return prisma.spot.create({
      data: {
        date: new Date().toISOString(),
        description: spot.location.description,
        location: {
          create: {
            latitude: spot.location.latitude,
            longitude: spot.location.longitude,
          },
        },
        foodTruck: {
          create: {
            name: spot.foodTruck.name,
            homeCity: spot.foodTruck.homeCity,
            tags: spot.foodTruck.tags.join(","),
            rating: spot.foodTruck.rating,
            category: spot.foodTruck.category,
            thumbnail: spot.foodTruck.thumbnail,
            description: spot.foodTruck.description,
          },
        },
      },
    });
  });

  // Await all promises to resolve
  await Promise.all(promises);

  console.log("Seeding complete");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
