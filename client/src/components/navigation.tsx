import { Hotel, Bed, Utensils, CalendarCheck, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: 'rooms' | 'food' | 'bookings';
  onTabChange: (tab: 'rooms' | 'food' | 'bookings') => void;
  cartItemCount: number;
  onCartClick: () => void;
}

export default function Navigation({ activeTab, onTabChange, cartItemCount, onCartClick }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Hotel className="text-brand-red text-2xl mr-2" />
              <span className="text-xl font-bold text-gray-900">HotelHub</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => onTabChange('rooms')}
                className={`flex items-center px-1 pb-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'rooms' 
                    ? 'text-brand-red border-brand-red' 
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                <Bed className="mr-1 h-4 w-4" /> Rooms
              </button>
              <button 
                onClick={() => onTabChange('food')}
                className={`flex items-center px-1 pb-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'food' 
                    ? 'text-brand-red border-brand-red' 
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                <Utensils className="mr-1 h-4 w-4" /> Food & Dining
              </button>
              <button 
                onClick={() => onTabChange('bookings')}
                className={`flex items-center px-1 pb-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'bookings' 
                    ? 'text-brand-red border-brand-red' 
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                <CalendarCheck className="mr-1 h-4 w-4" /> My Bookings
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative text-gray-600 hover:text-brand-red transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <Button className="bg-red-500 text-white hover:bg-red-600">
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <button 
            onClick={() => onTabChange('rooms')}
            className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left transition-colors ${
              activeTab === 'rooms' 
                ? 'text-brand-red bg-red-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bed className="inline mr-2 h-4 w-4" /> Rooms
          </button>
          <button 
            onClick={() => onTabChange('food')}
            className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left transition-colors ${
              activeTab === 'food' 
                ? 'text-brand-red bg-red-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Utensils className="inline mr-2 h-4 w-4" /> Food & Dining
          </button>
          <button 
            onClick={() => onTabChange('bookings')}
            className={`block px-3 py-2 text-base font-medium rounded-md w-full text-left transition-colors ${
              activeTab === 'bookings' 
                ? 'text-brand-red bg-red-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CalendarCheck className="inline mr-2 h-4 w-4" /> My Bookings
          </button>
        </div>
      </div>
    </nav>
  );
}
