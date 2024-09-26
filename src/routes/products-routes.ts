import { Router } from "express";
import { ProductsController } from "../controller/products-controller";

const produtsRouter = Router()

const productsController = new ProductsController()

produtsRouter.get('/', productsController.index)
produtsRouter.post('/', productsController.create)

export { produtsRouter }