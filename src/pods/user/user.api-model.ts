import { Role } from "#common-app/index.js";
import { ObjectId } from "mongodb";


export interface User{
    _id?: ObjectId
    name:string,
    email: string,
    enable: boolean,
    createDate: Date,
    role: Role,
    password: string
}