import jwt from 'jsonwebtoken'
import { UserSession } from "#common-app/index.js";
import { userRepository } from "#dals/user/index.js";
import { RequestHandler, Router } from "express";
import { userSessionFromUserModel } from "./security.mappers.js";
import { envConstant, jwtBaseSignConfig, secureCookieOptions } from '#core/index.js';
import { bearer } from '#common/index.js';



export const securityApi = Router()

const login : RequestHandler =async (req, res, next) => {
 try {
    const { email, password } = req.body
    const user = await userRepository.getUserByEmailAndPassword(email, password)
    
    const userSession: UserSession = userSessionFromUserModel(user)

    if (user) {
        const token = jwt.sign(userSession, envConstant.SECRET_KEY, jwtBaseSignConfig)

        res.cookie('authorization', bearer(token), secureCookieOptions)
        res.sendStatus(204)
    } else {
        res.sendStatus(401)
    }

 } catch (error) {
    next(error)
 }

}

securityApi
.post('/login', login)
.post('/logout')