import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSearch from "@/components/hero-search";
import RoomsSection from "@/components/rooms-section";
import FoodSection from "@/components/food-section";
import BookingsSection from "@/components/bookings-section";
import CartModal from "@/components/cart-modal";
import BookingModal from "@/components/booking-modal";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'food' | 'bookings'>('rooms');
  const [cartItems, setCartItems] = useState<Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const addToCart = (id: string, name: string, price: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === id);
      if (existingItem) {
        return prev.map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id, name, price, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const openBookingModal = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsBookingModalOpen(true);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      {activeTab === 'rooms' && <HeroSearch />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'rooms' && (
          <RoomsSection onBookRoom={openBookingModal} />
        )}
        
        {activeTab === 'food' && (
          <FoodSection onAddToCart={addToCart} />
        )}
        
        {activeTab === 'bookings' && (
          <BookingsSection />
        )}
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        roomId={selectedRoomId}
      />
    </div>
  );
}
