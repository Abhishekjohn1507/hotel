import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { RoomBooking, FoodOrder } from "@shared/schema";

export default function BookingsSection() {
  const { data: roomBookings, isLoading: roomBookingsLoading } = useQuery<RoomBooking[]>({
    queryKey: ['/api/room-bookings'],
  });

  const { data: foodOrders, isLoading: foodOrdersLoading } = useQuery<FoodOrder[]>({
    queryKey: ['/api/food-orders'],
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    // Create a Date object from the string
    const dateObj = new Date(dateString);
    
    // Check if dateObj is a valid Date
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date | string) => {
    // Ensure we have a Date object
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if dateObj is a valid Date
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (roomBookingsLoading || foodOrdersLoading) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h2>
          <p className="text-gray-600">Manage your room reservations and food orders</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[1, 2].map(i => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h2>
        <p className="text-gray-600">Manage your room reservations and food orders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room Bookings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Room Reservations</h3>
          <div className="space-y-4">
            {roomBookings && roomBookings.length > 0 ? (
              roomBookings.map(booking => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Room Booking</h4>
                        <p className="text-gray-600">Booking ID: #{booking.id.slice(0, 8)}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Check-in:</span><br />
                        {formatDate(booking.checkIn)}
                      </div>
                      <div>
                        <span className="font-medium">Check-out:</span><br />
                        {formatDate(booking.checkOut)}
                      </div>
                      <div>
                        <span className="font-medium">Guests:</span><br />
                        {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                      </div>
                      <div>
                        <span className="font-medium">Total:</span><br />
                        <span className="text-lg font-bold text-gray-900">${booking.totalAmount}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700" size="sm">
                        Cancel Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  <p>No room bookings found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Food Orders */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Food Orders</h3>
          <div className="space-y-4">
            {foodOrders && foodOrders.length > 0 ? (
              foodOrders.map(order => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</h4>
                        <p className="text-gray-600">
                          {order.roomNumber ? `Room ${order.roomNumber} • ` : ''}
                          {formatTime(order.createdAt)}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 flex justify-between font-medium text-gray-900">
                        <span>Total:</span>
                        <span>${order.totalAmount}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1" size="sm">
                        Track Order
                      </Button>
                      <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700" size="sm">
                        Cancel Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  <p>No food orders found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
