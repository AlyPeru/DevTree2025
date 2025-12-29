import { isAxiosError } from "axios"
import api from "../config/axios"
import type { ProfileForm, User } from "../types"

export async function getUser() {
    try {
        const { data } = await api<User>('/user')
        return(data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProfile(fromData : ProfileForm ) {
    try {
        const { data } = await api.patch<string>('/user', fromData) // aqui se espera un string por ello=> <string>  
        return(data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function uploadImage(file : File) { // FILE ES UN TIPO DE DATO DE JS intrnsico para manejar archivos

    const formData = new FormData() 
    formData.append('file', file) //'file' es el nombre del campo que espera el backend
        console.log("desde upload image")
    try {
        const {data} = await api.post('/user/image', formData)
        return data
    } catch (error) {
       if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}