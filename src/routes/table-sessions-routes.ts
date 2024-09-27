import { TableSessionsController } from "@/controller/tables-sessions-controller";
import { Router } from "express";

const tableSessionsRoutes = Router()

const tableSessionsController = new TableSessionsController()

tableSessionsRoutes.get('/', tableSessionsController.index)
tableSessionsRoutes.post('/', tableSessionsController.create)
tableSessionsRoutes.patch('/:id', tableSessionsController.update)


export { tableSessionsRoutes }

