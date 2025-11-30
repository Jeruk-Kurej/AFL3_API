import { prismaClient } from "../util/database-util";
import { ResponseError } from "../error/response-error";
import {
  OrderCreateRequest,
  OrderResponse,
  OrderWithRelations,
  toOrderResponse,
} from "../model/order-model";
import { OrderValidation } from "../validation/order-validation";
import { Validation } from "../validation/validation";

export class OrderService {
  static async create(request: OrderCreateRequest): Promise<OrderResponse> {
    const validatedData = Validation.validate(OrderValidation.CREATE, request);

    const customerCheck = await prismaClient.customer.count({
      where: { id: validatedData.customerId },
    });
    if (customerCheck === 0) {
      throw new ResponseError(404, "Customer not found!");
    }

    const restaurant = await prismaClient.restaurant.findUnique({
      where: { id: validatedData.restaurantId },
    });

    if (!restaurant) {
      throw new ResponseError(404, "Restaurant not found!");
    }

    if (!restaurant.is_opened) {
      throw new ResponseError(400, "Restaurant is currently closed!");
    }

    const order = await prismaClient.order.create({
      data: {
        customer_id: validatedData.customerId,
        restaurant_id: validatedData.restaurantId,
        item_amount: validatedData.itemAmount,
      },
      include: {
        customer: true,
        restaurant: true,
      },
    });

    return toOrderResponse(order);
  }

  static async list(
    customerId?: number,
    restaurantId?: number
  ): Promise<OrderResponse[]> {
    const whereClause: {
      customer_id?: number;
      restaurant_id?: number;
    } = {};

    if (customerId) whereClause.customer_id = customerId;
    if (restaurantId) whereClause.restaurant_id = restaurantId;

    const orders = await prismaClient.order.findMany({
      where: whereClause,
      include: {
        customer: true,
        restaurant: true,
      },
      orderBy: {
        order_time: "desc",
      },
    });

    return orders.map((order: OrderWithRelations) => toOrderResponse(order));
  }
}
