import { Request, Response, NextFunction } from "express";
import { OrderCreateRequest } from "../model/order-model";
import { OrderService } from "../service/order-service";

export class OrderController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: OrderCreateRequest = req.body as OrderCreateRequest;
            const response = await OrderService.create(request);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = req.query.customerId ? Number(req.query.customerId) : undefined;
            const restaurantId = req.query.restaurantId ? Number(req.query.restaurantId) : undefined;

            const response = await OrderService.list(customerId, restaurantId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}