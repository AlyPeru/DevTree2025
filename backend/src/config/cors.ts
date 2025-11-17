import {CorsOptions} from 'cors'
        console.log(process.argv[2])

export const corsConfig : CorsOptions = {

    origin : function(origin, callback){
        const whileList = [process.env.FRONTEND_URL] //estos cambios son para seguir usando thunder-client 
        
        if(process.argv[2] === '--api'){
            whileList.push(undefined)
        }

        if(whileList.includes(origin)){
            callback(null, true)
            console.log('Permitir conexion')
        }else{
            callback(new Error('Error de Cors'))
        }
    }
}

//Se utiliza process.env ===> para variables de entorno y process.argv para los script desde package.json