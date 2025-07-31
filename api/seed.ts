import { db } from "./db";
import { rooms, foodItems } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Sample rooms
  const sampleRooms = [
    {
      name: "Deluxe King Room",
      type: "double",
      price: "149.00",
      description: "Spacious room with king bed, city view, and modern amenities",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      amenities: ["WiFi", "AC", "TV", "Balcony"],
      rating: "4.8",
      reviewCount: 124,
      available: true,
    },
    {
      name: "Executive Suite",
      type: "suite",
      price: "249.00",
      description: "Luxury suite with separate living area, premium amenities and panoramic views",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      amenities: ["WiFi", "AC", "Smart TV", "Balcony", "Room Service"],
      rating: "4.9",
      reviewCount: 89,
      available: true,
    },
    {
      name: "Standard Twin Room",
      type: "single",
      price: "89.00",
      description: "Comfortable twin bed room perfect for friends or business travelers",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      amenities: ["WiFi", "AC", "TV"],
      rating: "4.3",
      reviewCount: 67,
      available: true,
    },
  ];

  // Sample food items
  const sampleFoodItems = [
    {
      name: "Grilled Salmon",
      category: "mains",
      price: "24.99",
      description: "Fresh Atlantic salmon with herbs and seasonal vegetables",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: "4.8",
      reviewCount: 45,
      prepTime: 25,
      available: true,
    },
    {
      name: "Classic Beef Burger",
      category: "mains",
      price: "18.99",
      description: "Juicy beef patty with cheese, lettuce, tomato and fries",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: "4.5",
      reviewCount: 72,
      prepTime: 20,
      available: true,
    },
    {
      name: "Crispy Calamari",
      category: "appetizers",
      price: "12.99",
      description: "Golden fried calamari rings with marinara sauce",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: "4.7",
      reviewCount: 38,
      prepTime: 15,
      available: true,
    },
    {
      name: "Chocolate Cake",
      category: "desserts",
      price: "8.99",
      description: "Rich chocolate layer cake with fresh berries",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: "4.9",
      reviewCount: 56,
      prepTime: 10,
      available: true,
    },
    {
      name: "Pasta Marinara",
      category: "mains",
      price: "16.99",
      description: "Fresh pasta with traditional marinara sauce and basil",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: "4.4",
      reviewCount: 29,
      prepTime: 18,
      available: true,
    },
    {
      name: "Fresh Orange Juice",
      category: "beverages",
      price: "5.99",
      description: "Freshly squeezed orange juice, vitamin-rich and refreshing",
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      rating: "4.8",
      reviewCount: 83,
      prepTime: 5,
      available: true,
    },
  ];

  try {
    // Insert rooms
    await db.insert(rooms).values(sampleRooms);
    console.log(`✅ Inserted ${sampleRooms.length} rooms`);

    // Insert food items
    await db.insert(foodItems).values(sampleFoodItems);
    console.log(`✅ Inserted ${sampleFoodItems.length} food items`);

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();