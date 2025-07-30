import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HeroSearch() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log({ checkIn, checkOut, guests });
  };

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl text-red-100">Book rooms and order delicious food with ease</p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 text-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-1">
                Check-in
              </Label>
              <Input
                id="checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-1">
                Check-out
              </Label>
              <Input
                id="checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Guests
              </Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full bg-red-500 text-white hover:bg-red-600"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
