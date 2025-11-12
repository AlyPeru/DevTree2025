export type User ={
    name : string
    handle : string
    email : string
}

export type ResgisterForm = Pick<User, "name" | "handle" | "email">&{
 password : string
 password_confirmation: string
}