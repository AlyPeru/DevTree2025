import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import slug from 'slug'
import formidable from "formidable"
import {v4 as uuid} from 'uuid'
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"
import couldinary from "../config/cloudinary"


export const createAccount = async (req: Request, res: Response) => {

  const { email, password } = req.body
  const userExist = await User.findOne({ email })

  if (userExist) {
    const error = new Error("Un usuario con este email ya esta registrado")
    return res.status(409).json({ error: error.message })
  }

  const handle = slug(req.body.handle, '')
  const handleExist = await User.findOne({ handle })
  if (handleExist) {
    const error = new Error("Existe un usuario con ese handle")
    return res.status(409).json({ error: error.message })
  }

  const user = new User(req.body)
  user.password = await hashPassword(password)
  user.handle = handle

  await user.save()
  res.send("Registro Creado Correctamente")
}

export const login = async (req: Request, res: Response) => {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Revisar si el usuario esta autenticado
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    const error = new Error("El usuario no existe")
    return res.status(400).json({ error: error.message })
  }

  //Revisar si el password es el correcto
  const isPasswordCorrect = await checkPassword(password, user.password)

  if (!isPasswordCorrect) {
    const error = new Error("Su password es incorrecto")
    return res.status(400).json({ error: error.message })
  }

  const token = generateJWT({ id: user._id })
  res.send(token)

}

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description } = req.body

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({ handle })
    if (handleExist && handleExist.email !== req.user.email) { //en caso de que sea el mismo usuario que esta actualizado su handle
      const error = new Error("Existe un usuario con ese handle")
      return res.status(409).json({ error: error.message })
    }

    //Actualizar el perfil
    req.user.description = description
    req.user.handle = handle
    await req.user.save()
    res.send("Perfil actualizado correctamente")

  } catch (e) {
    const error = new Error("Hubo un error")
    return res.status(500).json({ error: error.message })
  }
}

export const uploadImage = async (req: Request,  res: Response) => {
  const form = formidable({ multiples: false });

  try {
    form.parse(req, (error, fields, files) => {
      couldinary.uploader.upload(files.file[0].filepath, {public_id: uuid()} , async function (error, result) {
       
        if (error){
          const err = new Error("Hubo un error al subir la imagen a cloudinary")
          return res.status(500).json({ error: err.message })
        };
        
        if(result) {
          req.user.image = result.secure_url // Asignar la url de la imagen subida al usuario
          await req.user.save() // Guardar la url en la base de datos
          res.json({image: result.secure_url })
        }
      })
    })
  } catch (e) {
    const error = new Error("Hubo un error al subir la imagen")
    return res.status(500).json({ error: error.message })
  }
}

