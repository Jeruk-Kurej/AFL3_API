import { Request, Response, NextFunction } from "express";
import { 
    RestaurantCreateRequest, 
    RestaurantUpdateRequest 
} from "../model/restaurant-model";
import { RestaurantService } from "../service/restaurant-service";

export class RestaurantController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RestaurantCreateRequest = req.body as RestaurantCreateRequest;
            const response = await RestaurantService.create(request);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const status = req.query.status as string; 
            
            const response = await RestaurantService.list(status);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const response = await RestaurantService.get(restaurantId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RestaurantUpdateRequest = req.body as RestaurantUpdateRequest;
            const restaurantId = Number(req.params.restaurantId);

            const response = await RestaurantService.update(restaurantId, request);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const response = await RestaurantService.delete(restaurantId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}