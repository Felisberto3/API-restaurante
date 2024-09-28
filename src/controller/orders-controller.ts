import { knex } from "@/database/knex"
import { AppError } from "@/util/AppError"
import { Request, Response, NextFunction } from "express"
import {z} from "zod"
class OrdersController {
  async index(request:Request, response:Response, next: NextFunction) {
    try {
   

      const table_session_id = z
      .string()
      .regex(/^\d+$/, {
        message: 'O ID deve ser um número positivo',
      }).transform(Number).parse(request.params.table_session_id);

      const orders = await knex<ordersRepository>("orders")
      .select(
        "orders.id",
        "orders.table_session_id",
        "orders.product_id",
        "products.name",
        "orders.price",
        "orders.quantity",
        knex.raw("orders.price * orders.quantity As total"  ),
        "orders.created_at",
        "orders.updated_at"
        )
      .join("products", "products.id","orders.product_id")
      .where({ table_session_id })
      .orderBy("orders.created_at", "desc")


      return response.json(orders)
    } catch (error) {
      next(error)
    }
  }

  async create(request:Request, response:Response, next: NextFunction) {
    try {
      
      const { price, product_id,quantity,table_session_id} = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
        price: z.number()
      }).parse(request.body)

      const sessions = await knex<TablesSessionsRepository>("tables_sessions")
      .where({ id: table_session_id })
      .first()

      if (!sessions) {
        throw new AppError("session table not found");
      }

      if (sessions.closed_at) {
        throw new AppError("this  table is closed");
      }

      const product = await knex<ProductRepository>("products")
        .where({ id: product_id})
        .first()

      if (!product) {
        throw new AppError("product not found");
      }
        
      await knex<ordersRepository>("orders")
        .insert({
          product_id,
          price:product.price,
          quantity,
          table_session_id
        })
      return response.status(201).json()

    } catch (error) {
      next(error)
    }

    
  }

  async show(request:Request, response:Response, next: NextFunction) {
    try {
      const table_session_id = z
      .string()
      .regex(/^\d+$/,{ message:"Id must be a number"})
      .transform(Number)
      .parse(request.params.table_session_id)


      const order = await knex<ordersRepository>("orders")
      .select(
        knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) as total"),
        knex.raw("COALESCE(SUM( orders.quantity), 0) as quantity")
      )
      .where({ table_session_id })

      return response.json(order)
    } catch (error) {
      next(error)
    }
  }

}

export { OrdersController }