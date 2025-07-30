import { type Room, type FoodItem, type RoomBooking, type FoodOrder, type InsertRoom, type InsertFoodItem, type InsertRoomBooking, type InsertFoodOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Rooms
  getRooms(): Promise<Room[]>;
  getRoom(id: string): Promise<Room | undefined>;
  createRoom(room: InsertRoom): Promise<Room>;
  
  // Food Items
  getFoodItems(): Promise<FoodItem[]>;
  getFoodItem(id: string): Promise<FoodItem | undefined>;
  createFoodItem(foodItem: InsertFoodItem): Promise<FoodItem>;
  
  // Room Bookings
  getRoomBookings(): Promise<RoomBooking[]>;
  getRoomBooking(id: string): Promise<RoomBooking | undefined>;
  createRoomBooking(booking: InsertRoomBooking): Promise<RoomBooking>;
  updateRoomBookingStatus(id: string, status: string): Promise<RoomBooking | undefined>;
  
  // Food Orders
  getFoodOrders(): Promise<FoodOrder[]>;
  getFoodOrder(id: string): Promise<FoodOrder | undefined>;
  createFoodOrder(order: InsertFoodOrder): Promise<FoodOrder>;
  updateFoodOrderStatus(id: string, status: string): Promise<FoodOrder | undefined>;
}

export class MemStorage implements IStorage {
  private rooms: Map<string, Room>;
  private foodItems: Map<string, FoodItem>;
  private roomBookings: Map<string, RoomBooking>;
  private foodOrders: Map<string, FoodOrder>;

  constructor() {
    this.rooms = new Map();
    this.foodItems = new Map();
    this.roomBookings = new Map();
    this.foodOrders = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample rooms
    const sampleRooms: Room[] = [
      {
        id: "deluxe-king",
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
        id: "executive-suite",
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
        id: "standard-twin",
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
    const sampleFoodItems: FoodItem[] = [
      {
        id: "grilled-salmon",
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
        id: "classic-burger",
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
        id: "crispy-calamari",
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
        id: "chocolate-cake",
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
        id: "pasta-marinara",
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
        id: "orange-juice",
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

    sampleRooms.forEach(room => this.rooms.set(room.id, room));
    sampleFoodItems.forEach(item => this.foodItems.set(item.id, item));
  }

  // Room methods
  async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: string): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const id = randomUUID();
    const room: Room = { ...insertRoom, id };
    this.rooms.set(id, room);
    return room;
  }

  // Food Item methods
  async getFoodItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values());
  }

  async getFoodItem(id: string): Promise<FoodItem | undefined> {
    return this.foodItems.get(id);
  }

  async createFoodItem(insertFoodItem: InsertFoodItem): Promise<FoodItem> {
    const id = randomUUID();
    const foodItem: FoodItem = { ...insertFoodItem, id };
    this.foodItems.set(id, foodItem);
    return foodItem;
  }

  // Room Booking methods
  async getRoomBookings(): Promise<RoomBooking[]> {
    return Array.from(this.roomBookings.values());
  }

  async getRoomBooking(id: string): Promise<RoomBooking | undefined> {
    return this.roomBookings.get(id);
  }

  async createRoomBooking(insertBooking: InsertRoomBooking): Promise<RoomBooking> {
    const id = randomUUID();
    const booking: RoomBooking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date()
    };
    this.roomBookings.set(id, booking);
    return booking;
  }

  async updateRoomBookingStatus(id: string, status: string): Promise<RoomBooking | undefined> {
    const booking = this.roomBookings.get(id);
    if (booking) {
      booking.status = status;
      this.roomBookings.set(id, booking);
    }
    return booking;
  }

  // Food Order methods
  async getFoodOrders(): Promise<FoodOrder[]> {
    return Array.from(this.foodOrders.values());
  }

  async getFoodOrder(id: string): Promise<FoodOrder | undefined> {
    return this.foodOrders.get(id);
  }

  async createFoodOrder(insertOrder: InsertFoodOrder): Promise<FoodOrder> {
    const id = randomUUID();
    const order: FoodOrder = { 
      ...insertOrder, 
      id, 
      createdAt: new Date()
    };
    this.foodOrders.set(id, order);
    return order;
  }

  async updateFoodOrderStatus(id: string, status: string): Promise<FoodOrder | undefined> {
    const order = this.foodOrders.get(id);
    if (order) {
      order.status = status;
      this.foodOrders.set(id, order);
    }
    return order;
  }
}

export const storage = new MemStorage();
