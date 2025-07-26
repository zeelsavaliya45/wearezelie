export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'paypal';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}