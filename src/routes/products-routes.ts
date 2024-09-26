import { Router } from "express";
import { ProductsController } from "../controller/products-controller";

const produtsRouter = Router()

const productsController = new ProductsController()

produtsRouter.get('/', productsController.index)
produtsRouter.post('/', productsController.create)
produtsRouter.put('/:id', productsController.update)
produtsRouter.delete('/:id', productsController.remove)

export { produtsRouter }