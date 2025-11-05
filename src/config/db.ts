import mongoose from "mongoose";
import colors from 'colors'

export const connectDB = async () => {
    try{

        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        const url =`${connection.host}:${connection.port}`
        console.log(colors.blue.bold.italic(`Mongoose conectadosss en ${url}`))

    } catch(error){
        console.log(error.message)
        process.exit(1)//termina el proceso

    }
}