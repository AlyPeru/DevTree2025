import {CorsOptions} from 'cors'

export const corsConfig : CorsOptions = {
    origin : function(origin, callback){
        const whileList = [process.env.FRONTEND_URL] //estos cambios son para seguir usando thunder-client 
        if(whileList.includes(origin)){
            callback(null, true)
            console.log('Permitir conexion')
        }else{
            callback(new Error('Error de Cors'))
        }
    }
}