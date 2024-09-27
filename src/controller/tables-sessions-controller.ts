import { knex } from "@/database/knex"
import { Request, NextFunction, Response  } from "express"
class TableSessionsController {
    async index(request: Request, response:Response, next:NextFunction) {
      try {
          const table_session = await knex("table_sessions").select()

          return response.json(table_session)
      } catch (error) {
        next(error)
      }
    }

    async create(request: Request, response:Response, next:NextFunction) {
      try {
          const table_session = await knex("table_sessions").select()
          return response.json(table_session)
      } catch (error) {
        next(error)
      }
    }
}

export { TableSessionsController }