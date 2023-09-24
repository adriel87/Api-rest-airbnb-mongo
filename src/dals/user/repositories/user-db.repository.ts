import { userFromApiToModel, userFromModelToApi } from "#pods/index.js";
import jwt from 'jsonwebtoken'

import { ObjectId } from "mongodb";
import userContext from "../user.context.js";
import { UserRepository } from "./user.repository.js";
import { hashPassword } from "#common/index.js";
import { envConstant } from "#core/index.js";



export const userDBRespository : UserRepository = {
    getUserByEmailAndPassword : async (email, password) =>{
        const user = await userContext().findOne({
            email: email, 
        })
        
        throw Error('Not implement yet!')
    },
    getUserById :async (id) => {
        throw Error('Not implement yet!')
    },
    saveUser:async (user) => {
        const password = await hashPassword(user.password, envConstant.SALT) 
        const newUser = userFromModelToApi(user);
        newUser.password = password
        const saveUser = await userContext().insertOne(newUser) 
        if (saveUser.acknowledged) {
            return user
        }
        throw Error('We cant save the new user')
    },
    updateUserRole:async (role, userId) => {
        throw Error('Not implement yet!')
    }

}