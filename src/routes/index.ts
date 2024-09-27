import { Router } from "express";
import { produtsRouter } from "./products-routes";
import { tablesRoutes } from "./tables-routes";
import { tableSessionsRoutes } from "./table-sessions-routes";

const routes = Router()

routes.use('/products', produtsRouter)
routes.use('/tables', tablesRoutes)
routes.use('/tables-sessions', tableSessionsRoutes)


export { routes }