import { RequestHandler, Router } from "express";
import { userFromModelToApi } from "./user.mappers.js";
import userContext from "#dals/user/user.context.js";
import { userRepository } from "#dals/index.js";

export const userApi = Router()

const createUser : RequestHandler = async (req, res, next) => {
    try {
        const { user } = req.body;
    
        if (!user) {
            res.status(404).send('para crear un usuario, por favor envia un usario')
        }
      
        const savedUser = await userRepository.saveUser(user)
        res.send(savedUser)
        
    } catch (error) {
        next(error)    
    }


}

userApi
.post('/create', createUser)