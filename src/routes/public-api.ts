import express from "express"
import { CustomerController } from "../controller/customer-controller"
import { RestaurantController } from "../controller/restaurant-controller"
import { OrderController } from "../controller/order-controller"

export const publicRouter = express.Router()

// --- CUSTOMER API ---
publicRouter.post("/customers", CustomerController.create)
publicRouter.get("/customers", CustomerController.list)
publicRouter.get("/customers/:customerId", CustomerController.get) 
publicRouter.patch("/customers/:customerId", CustomerController.update) 
publicRouter.delete("/customers/:customerId", CustomerController.delete)

// --- RESTAURANT API ---
publicRouter.post("/restaurants", RestaurantController.create)
publicRouter.get("/restaurants", RestaurantController.list) 
publicRouter.get("/restaurants/:restaurantId", RestaurantController.get)
publicRouter.patch("/restaurants/:restaurantId", RestaurantController.update)
publicRouter.delete("/restaurants/:restaurantId", RestaurantController.delete)

// --- ORDER API ---
publicRouter.post("/orders", OrderController.create)
publicRouter.get("/orders", OrderController.list)