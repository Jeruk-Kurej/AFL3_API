import { Restaurant } from "../../generated/prisma/client";
//harusnya sih ga perlu /client, tapi gara" versi 6.19 jadinya perlu

export interface RestaurantResponse {
  id: number;
  name: string;
  description: string;
  isOpened: boolean;
}

export interface RestaurantCreateRequest {
  name: string;
  description: string;
  isOpened?: boolean;
}

export interface RestaurantUpdateRequest {
  name?: string;
  description?: string;
  isOpened?: boolean;
}

export function toRestaurantResponse(
  restaurant: Restaurant
): RestaurantResponse {
  return {
    id: restaurant.id,
    name: restaurant.name,
    description: restaurant.description,
    isOpened: restaurant.is_opened,
  };
}
