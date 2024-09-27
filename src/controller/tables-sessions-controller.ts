import { knex } from "@/database/knex"
import { Request, NextFunction, Response  } from "express"
import { z } from "zod"
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
        const bodySchema = z.object({
          table_id: z.number({
            required_error:"não informaste o id",
            invalid_type_error:"o id deve ser um número"
          })
        })

        const { table_id } = bodySchema.parse(request.body)

          const table_session = await knex("tables_sessions").select()

          return response.json(table_session)
      } catch (error) {
        next(error)
      }
    }
}

export { TableSessionsController }