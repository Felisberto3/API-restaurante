import { OrdersController } from "@/controller/orders-controller";
import { Router } from "express";

const ordersRoutes = Router()

const ordersController =  new OrdersController()

ordersRoutes.get('/table-session/:table_session_id', ordersController.index)
ordersRoutes.get('/table-session/:table_session_id/total', ordersController.show)
ordersRoutes.post('/', ordersController.create)

export { ordersRoutes }