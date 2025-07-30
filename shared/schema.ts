import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rooms = pgTable("rooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // single, double, suite
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  amenities: text("amenities").array().notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull(),
  available: boolean("available").notNull().default(true),
});

export const foodItems = pgTable("food_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(), // appetizers, mains, desserts, beverages
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull(),
  prepTime: integer("prep_time").notNull(), // in minutes
  available: boolean("available").notNull().default(true),
});

export const roomBookings = pgTable("room_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roomId: varchar("room_id").notNull(),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestPhone: text("guest_phone").notNull(),
  checkIn: text("check_in").notNull(),
  checkOut: text("check_out").notNull(),
  guests: integer("guests").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("confirmed"), // confirmed, cancelled
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const foodOrders = pgTable("food_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roomNumber: text("room_number"),
  items: jsonb("items").notNull(), // array of {id, name, price, quantity}
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("preparing"), // preparing, ready, delivered, cancelled
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertRoomSchema = createInsertSchema(rooms).omit({
  id: true,
});

export const insertFoodItemSchema = createInsertSchema(foodItems).omit({
  id: true,
});

export const insertRoomBookingSchema = createInsertSchema(roomBookings).omit({
  id: true,
  createdAt: true,
});

export const insertFoodOrderSchema = createInsertSchema(foodOrders).omit({
  id: true,
  createdAt: true,
});

export type Room = typeof rooms.$inferSelect;
export type FoodItem = typeof foodItems.$inferSelect;
export type RoomBooking = typeof roomBookings.$inferSelect;
export type FoodOrder = typeof foodOrders.$inferSelect;

export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type InsertFoodItem = z.infer<typeof insertFoodItemSchema>;
export type InsertRoomBooking = z.infer<typeof insertRoomBookingSchema>;
export type InsertFoodOrder = z.infer<typeof insertFoodOrderSchema>;
