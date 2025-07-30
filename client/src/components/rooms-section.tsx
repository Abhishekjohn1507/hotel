import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, Wifi, Snowflake, Tv, DoorOpen, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Room } from "@shared/schema";

interface RoomsSectionProps {
  onBookRoom: (roomId: string) => void;
}

export default function RoomsSection({ onBookRoom }: RoomsSectionProps) {
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [amenityFilter, setAmenityFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('price');

  const { data: rooms, isLoading, error } = useQuery<Room[]>({
    queryKey: ['/api/rooms'],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <Skeleton className="h-96 w-full" />
        </div>
        <div className="lg:w-3/4 space-y-6">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load rooms. Please try again.</p>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-3 w-3" />;
      case 'ac': return <Snowflake className="h-3 w-3" />;
      case 'tv': 
      case 'smart tv': return <Tv className="h-3 w-3" />;
      case 'balcony': return <DoorOpen className="h-3 w-3" />;
      case 'room service': return <Bell className="h-3 w-3" />;
      default: return null;
    }
  };

  const getAmenityColor = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return 'bg-blue-100 text-blue-800';
      case 'ac': return 'bg-green-100 text-green-800';
      case 'tv':
      case 'smart tv': return 'bg-purple-100 text-purple-800';
      case 'balcony': return 'bg-orange-100 text-orange-800';
      case 'room service': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRooms = rooms?.filter(room => {
    const price = parseFloat(room.price);
    const matchesPrice = priceFilter.length === 0 || priceFilter.some(range => {
      switch (range) {
        case '50-100': return price >= 50 && price <= 100;
        case '100-200': return price >= 100 && price <= 200;
        case '200+': return price >= 200;
        default: return true;
      }
    });

    const matchesType = typeFilter.length === 0 || typeFilter.includes(room.type);
    const matchesAmenity = amenityFilter.length === 0 || 
      amenityFilter.some(amenity => room.amenities.some(roomAmenity => 
        roomAmenity.toLowerCase().includes(amenity.toLowerCase())
      ));

    return matchesPrice && matchesType && matchesAmenity;
  }) || [];

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'rating':
        return parseFloat(b.rating) - parseFloat(a.rating);
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="lg:w-1/4">
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
            
            {/* Price Range */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">Price Range</Label>
              <div className="space-y-2">
                {[
                  { value: '50-100', label: '$50 - $100' },
                  { value: '100-200', label: '$100 - $200' },
                  { value: '200+', label: '$200+' }
                ].map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`price-${option.value}`}
                      checked={priceFilter.includes(option.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPriceFilter(prev => [...prev, option.value]);
                        } else {
                          setPriceFilter(prev => prev.filter(p => p !== option.value));
                        }
                      }}
                    />
                    <Label htmlFor={`price-${option.value}`} className="text-sm text-gray-600">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Type */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">Room Type</Label>
              <div className="space-y-2">
                {[
                  { value: 'single', label: 'Single' },
                  { value: 'double', label: 'Double' },
                  { value: 'suite', label: 'Suite' }
                ].map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${option.value}`}
                      checked={typeFilter.includes(option.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTypeFilter(prev => [...prev, option.value]);
                        } else {
                          setTypeFilter(prev => prev.filter(t => t !== option.value));
                        }
                      }}
                    />
                    <Label htmlFor={`type-${option.value}`} className="text-sm text-gray-600">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">Amenities</Label>
              <div className="space-y-2">
                {['WiFi', 'AC', 'TV', 'Balcony'].map(amenity => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`amenity-${amenity}`}
                      checked={amenityFilter.includes(amenity)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAmenityFilter(prev => [...prev, amenity]);
                        } else {
                          setAmenityFilter(prev => prev.filter(a => a !== amenity));
                        }
                      }}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="text-sm text-gray-600">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setPriceFilter([]);
                setTypeFilter([]);
                setAmenityFilter([]);
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Room Listings */}
      <div className="lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Rooms</h2>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Sort by Price</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {sortedRooms.map(room => (
            <Card key={room.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="h-48 md:h-full w-full object-cover"
                  />
                </div>
                <CardContent className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(parseFloat(room.rating)) ? 'fill-current' : ''
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">
                        ({room.rating}) • {room.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map(amenity => (
                      <Badge 
                        key={amenity} 
                        variant="secondary"
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAmenityColor(amenity)}`}
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${room.price}</span>
                      <span className="text-gray-600">/night</span>
                    </div>
                    <Button 
                      onClick={() => onBookRoom(room.id)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {sortedRooms.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No rooms match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
