import { Role } from "#common-app/index.js";


export interface User {
    id: string
    name:string,
    email: string,
    enable: boolean,
    createDate: Date,
    role: Role,
    password: string
}