import colors from 'colors'
import { RequestHandler } from "express";

import { allowedMethods } from "#common-app/index.ts";
import { envConstant } from "#core/index.ts";

export const isValidMethod : RequestHandler = (req, res, next) => {
    const method = req.method
    if (allowedMethods(envConstant.CORS_METHODS).includes(method)) next()
    else {
        const baseMessage = colors.bgYellow('Trying to connect whit invalid method ---> ')
        const invalidMethod = colors.yellow.bold(method)
        console.log(baseMessage + invalidMethod)
        res.sendStatus(403)
    }

}