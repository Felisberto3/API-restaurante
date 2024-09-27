import { Router } from "express";
import { produtsRouter } from "./products-routes";
import { tablesRoutes } from "./tables-routes";

const routes = Router()

routes.use('/products', produtsRouter)
routes.use('/tables', tablesRoutes)

export { routes }