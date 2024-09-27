import { knex } from "../database/knex"
import { Request, Response  } from "express";

class TablesController {
  async index(request: Request, response: Response ) {
    const tables = await knex("tables").select()
    return response.json(tables)
  }
}

export { TablesController }