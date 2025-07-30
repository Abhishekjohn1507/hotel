// This file can be used for any additional data utilities or constants
// Currently keeping it minimal as the data is managed through the backend API

export const FOOD_CATEGORIES = [
  { value: 'all', label: 'All Items' },
  { value: 'appetizers', label: 'Appetizers' },
  { value: 'mains', label: 'Main Course' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'beverages', label: 'Beverages' },
];

export const ROOM_TYPES = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'suite', label: 'Suite' },
];

export const PRICE_RANGES = [
  { value: '50-100', label: '$50 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200+', label: '$200+' },
];

export const AMENITIES = ['WiFi', 'AC', 'TV', 'Balcony'];

export const STATUS_COLORS = {
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  preparing: 'bg-blue-100 text-blue-800',
  ready: 'bg-yellow-100 text-yellow-800',
  delivered: 'bg-green-100 text-green-800',
};
