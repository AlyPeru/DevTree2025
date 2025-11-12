import type { Request, Response } from "express"
import { validationResult} from "express-validator"
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"


export const createAccount = async(req : Request, res: Response) => {

    const {email, password} = req.body
    const userExist = await User.findOne({email})
    
    if(userExist) {
      const error = new Error("Un usuario con este email ya esta registrado")
      return res.status(409).json({error:error.message})
    }

    const handle = slug(req.body.handle,'')
    const handleExist = await User.findOne({handle})
    if(handleExist){
      const error = new Error("Existe un usuario con ese handle")
      return res.status(409).json({error:error.message})
    }
    
    const user = new User(req.body)
    user.password = await hashPassword(password)   
    user.handle = handle

    await user.save()
    res.send("Registro Creado Correctamente")
}
    
export const login = async (req : Request, res:Response) =>{
  let errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }

// Revisar si el usuario esta autenticado
  const {email, password} = req.body
  const user = await User.findOne({email})
    
    if(!user) {
      const error = new Error("El usuario no existe")
      return res.status(400).json({error:error.message})
    }

//Revisar si el password es el correcto
  const isPasswordCorrect = await checkPassword(password, user.password)

    if(!isPasswordCorrect){
      const error = new Error("Su password es incorrecto")
      return res.status(400).json({error:error.message})
    }

    res.send('Autenticado......')

}
   

