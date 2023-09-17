import colors from 'colors'
import { RequestHandler } from "express";

import { allowedMethods } from '#common-app/utils/allowedMethods.util.js';
import { envConstant } from '#core/index.js';

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