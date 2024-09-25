import { Router } from "express";
import { produtsRouter } from "./products-routes";

const routes = Router()

routes.use('/products', produtsRouter)

export { routes }