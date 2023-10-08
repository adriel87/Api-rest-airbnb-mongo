import jwt from 'jsonwebtoken'

import { RequestHandler } from "express";
import { Role, UserSession } from '#common-app/index.js';
import { envConstant } from '#core/index.js';

const verify = async (token:string, secret:string): Promise<UserSession> =>{
    try {
        const userSession =  await jwt.verify(token, secret) as UserSession
        if (userSession) {
            return userSession
        }
        return null
    } catch (error) {
        return error
    }
}

export const userAuthenticate : RequestHandler = async (req, res, next) =>{
    try {
        const [,token] = req.cookies.authorization?.split(' ') || []
        if (token) {
            const userSession = await verify(token, envConstant.SECRET_KEY)
        
            req.userSession = userSession
            next()
            
        }else {
            res.sendStatus(403)
        }
    } catch (error) {
        next(error)        
    }
}

export const userAuthorization = (allowRole:Role): RequestHandler => async (req, res , next) => {
    try {
        const { role } = req.userSession
        if (role === allowRole) {
            next()
        }else {
            res.sendStatus(403)
        }
        
    } catch (error) {
        res.sendStatus(403)
        next(error)    
    }
}