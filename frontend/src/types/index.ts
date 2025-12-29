export type User = {
    name : string
    handle : string
    email : string
    _id : string
    description : string
    image: string
}

//ojo este simbolo => | <= se llama union type
export type ResgisterForm = Pick<User, "name" | "handle" | "email">&{
 password : string
 password_confirmation: string
}

export type LoginForm = Pick<User,  'email'> & {
    password: string
}

export type ProfileForm = Pick<User , 'handle' | 'description'>