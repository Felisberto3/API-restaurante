import { knex } from "@/database/knex"
import { AppError } from "@/util/AppError"
import { Request, NextFunction, Response  } from "express"
import { z } from "zod"
class TableSessionsController {
    async index(request: Request, response:Response, next:NextFunction) {
      try {
          const table_session = await knex<TablesSessionsRepository>("tables_sessions")
          .select()
          .orderBy("closed_at")

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

        const session = await knex<TablesSessionsRepository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first()

        if (session && !session?.closed_at) {
          throw new AppError("This table is already open");
        }
         await knex<TablesSessionsRepository>("tables_sessions")
          .insert({table_id, opened_at: knex.fn.now()})

          return response.status(201).json()
      } catch (error) {
        next(error)
      }
    }
}

export { TableSessionsController }