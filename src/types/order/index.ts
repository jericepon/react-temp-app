
export interface Ingredient {
  id: number;
  name: string;
}

export interface OrderCartItem {
  addIngredients: Ingredient[];
  removeIngredients: Ingredient[];
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  customer: string;
  status: string;
  priority: boolean;
  cart: OrderCartItem[];
  id: string;
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
}