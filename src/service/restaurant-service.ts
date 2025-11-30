import { prismaClient } from "../util/database-util";
import { ResponseError } from "../error/response-error";
import {
    RestaurantCreateRequest,
    RestaurantResponse,
    RestaurantUpdateRequest,
    toRestaurantResponse
} from "../model/restaurant-model";
import { RestaurantValidation } from "../validation/restaurant-validation";
import { Validation } from "../validation/validation";
import { Restaurant } from "../../generated/prisma/client";

export class RestaurantService {

    static async create(request: RestaurantCreateRequest): Promise<RestaurantResponse> {
        const validatedData = Validation.validate(RestaurantValidation.CREATE, request);

        const restaurant = await prismaClient.restaurant.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                is_opened: validatedData.isOpened ?? true
            }
        });

        return toRestaurantResponse(restaurant);
    }

    static async list(status?: string): Promise<RestaurantResponse[]> {
        const whereClause: { is_opened?: boolean } = {};

        if (status === 'opened') {
            whereClause.is_opened = true;
        } else if (status === 'closed') {
            whereClause.is_opened = false;
        }

        const restaurants = await prismaClient.restaurant.findMany({
            where: whereClause,
            orderBy: {
                id: 'desc'
            }
        });

        return restaurants.map((restaurant: Restaurant) => toRestaurantResponse(restaurant));
    }

    static async get(id: number): Promise<RestaurantResponse> {
        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id: id }
        });

        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found!");
        }

        return toRestaurantResponse(restaurant);
    }

    static async update(id: number, request: RestaurantUpdateRequest): Promise<RestaurantResponse> {
        const validatedData = Validation.validate(RestaurantValidation.UPDATE, request);

        const restaurantCheck = await prismaClient.restaurant.count({
            where: { id: id }
        });

        if (restaurantCheck === 0) {
            throw new ResponseError(404, "Restaurant not found!");
        }

        const dataToUpdate: any = {};
        if (validatedData.name) dataToUpdate.name = validatedData.name;
        if (validatedData.description) dataToUpdate.description = validatedData.description;
        if (validatedData.isOpened !== undefined) dataToUpdate.is_opened = validatedData.isOpened;

        const restaurant = await prismaClient.restaurant.update({
            where: { id: id },
            data: dataToUpdate
        });

        return toRestaurantResponse(restaurant);
    }

    static async delete(id: number): Promise<string> {
        const restaurantCheck = await prismaClient.restaurant.count({
            where: { id: id }
        });

        if (restaurantCheck === 0) {
            throw new ResponseError(404, "Restaurant not found!");
        }

        await prismaClient.restaurant.delete({
            where: { id: id }
        });

        return "Restaurant data has been deleted successfully!";
    }
}