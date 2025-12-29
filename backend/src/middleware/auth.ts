import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: IUser //?=> puede ser un valor opcional porque no tiene qu estar en todas las rutas 
        }
    }
}

export const authenticate = async (req : Request, res: Response, next: NextFunction) => {
   const bearer = req.headers.authorization

  if (!bearer) {
    const error = new Error("No autorizado")
    return res.status(401).json({ error: error.message })
  }

  const [, token] = bearer.split(" ")

  if (!token) {
    const error = new Error("No autorizado")
    return res.status(401).json({ error: error.message })
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET)
    
    if (typeof result === 'object' && result.id) {
      const user = await User.findById(result.id).select('-password')

      if (!user) {
        const error = new Error("El usuario no existe")
        return res.status(401).json({ error: error.message })
      }
        req.user = user //estamos escribiendo sobre el req para agregarle el user para ello declaramos el obj global arriba y el namespace. y esto le va ha recibir en el siguiente midleware o handler getUser
       next()
    }
  } catch (error) {
     res.status(500).json({ error: "Token no valido" })
  }


}