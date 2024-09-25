import { AppError } from "@/util/AppError";
import { NextFunction, Response, Request } from "express";

export function errorHandling(error: any, request: Request, response: Response, _:NextFunction) { 
  if (error instanceof AppError ) {
    return response.status(error.statusCode).json({message: error.message})
  }

  return response.status(500).json({ message: error.message })
}