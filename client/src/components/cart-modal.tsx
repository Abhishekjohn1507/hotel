import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartModal({ 
  isOpen, 
  onClose, 
  items, 
  total, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const orderData = {
        roomNumber: "1205", // In a real app, this would come from user session
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price.toString(),
          quantity: item.quantity
        })),
        totalAmount: total.toFixed(2),
        status: "preparing"
      };

      return apiRequest('POST', '/api/food-orders', orderData);
    },
    onSuccess: () => {
      toast({
        title: "Order placed successfully!",
        description: "Your food will be delivered to your room soon.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/food-orders'] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Failed to place order",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <Card className="h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Cart</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2 font-medium min-w-[2rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-600 ml-2 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <Button 
              onClick={() => checkoutMutation.mutate()}
              disabled={checkoutMutation.isPending}
              className="w-full bg-red-500 text-white hover:bg-red-600"
            >
              {checkoutMutation.isPending ? 'Placing Order...' : 'Checkout'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
