import express from 'express' // ESM Ecmascript module
import 'dotenv/config'
import router from './router.ts'
import { connectDB} from './config/db.ts'

const app = express()

//Leer datos del Formulario(activar)
app.use(express.json())

connectDB();

//Routing
app.use('/' , router)

export default app