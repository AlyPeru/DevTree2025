import { Router } from "express";
import User from "./models/User.ts";
const router = Router();

/*Auth Registro*/

router.post('/auth/register', async(req, res) =>{
    // await User.create(req.body)
    const user = new User(req.body)
    await user.save()
    console.log(req.body , "hola desde autenticacion")

    res.send("Registro Creado Correctamente")
})

// router.get('/nosotros' , (req, res) =>{
//     res.send("Nosotros")
// })

// router.get('/blog' , (req, res) =>{
//     res.send("Blog")
// })

export default router