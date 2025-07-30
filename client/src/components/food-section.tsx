import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { FoodItem } from "@shared/schema";

interface FoodSectionProps {
  onAddToCart: (id: string, name: string, price: number) => void;
}

export default function FoodSection({ onAddToCart }: FoodSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: foodItems, isLoading, error } = useQuery<FoodItem[]>({
    queryKey: ['/api/food-items'],
  });

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Food & Dining</h2>
          <p className="text-gray-600">Order delicious meals delivered to your room</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load food items. Please try again.</p>
      </div>
    );
  }

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'appetizers', label: 'Appetizers' },
    { value: 'mains', label: 'Main Course' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'beverages', label: 'Beverages' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? foodItems 
    : foodItems?.filter(item => item.category === selectedCategory);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Food & Dining</h2>
        <p className="text-gray-600">Order delicious meals delivered to your room</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map(category => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            className={`rounded-full ${
              selectedCategory === category.value 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems?.map(item => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src={item.image} 
              alt={item.name}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(parseFloat(item.rating)) ? 'fill-current' : ''
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  ({item.rating}) • {item.reviewCount} reviews
                </span>
                <div className="flex items-center ml-auto text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {item.prepTime} min
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">${item.price}</span>
                <Button 
                  onClick={() => onAddToCart(item.id, item.name, parseFloat(item.price))}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
