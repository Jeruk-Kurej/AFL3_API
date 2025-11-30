import { Order, Customer, Restaurant } from "../../generated/prisma/client";
//harusnya sih ga perlu /client, tapi gara" versi 6.19 jadinya perlu

export type OrderWithRelations = Order & {
  customer: Customer;
  restaurant: Restaurant;
};

export interface OrderResponse {
  id: number;
  customerName: string;
  restaurantName: string;
  itemAmount: number;
  orderTime: string;
  estimatedArrivalTime: string;
}

export interface OrderCreateRequest {
  customerId: number;
  restaurantId: number;
  itemAmount: number;
}

function calculateETA(itemAmount: number, orderTime: Date): string {
  const totalMinutes = (itemAmount * 10) + 10;
  const etaDate = new Date(orderTime);
  etaDate.setMinutes(etaDate.getMinutes() + totalMinutes);

  return etaDate.toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function toOrderResponse(order: OrderWithRelations): OrderResponse {
  // ✅ Format orderTime juga
  const formattedOrderTime = order.order_time.toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return {
    id: order.id,
    customerName: order.customer.name,     
    restaurantName: order.restaurant.name,
    itemAmount: order.item_amount, 
    orderTime: formattedOrderTime,
    estimatedArrivalTime: calculateETA(order.item_amount, order.order_time)
  };
}
