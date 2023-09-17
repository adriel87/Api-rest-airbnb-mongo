import colors from 'colors'
import { ErrorRequestHandler, RequestHandler } from "express";

import { allowedMethods } from '#common-app/utils/allowedMethods.util.js';
import { envConstant } from '#core/index.js';



export const showRequestInConsole : RequestHandler = (req, res, next) => {
    const method = req.method
    
    if (allowedMethods(envConstant.CORS_METHODS).includes(method)) {
        const url = req.url
        switch (method) {
            case 'GET':
                console.log(colors.green.bold(method));
                console.log(url)
                next()
                break;
            case 'POST':
                console.log(colors.yellow.bold(method));
                console.log(url)
                next()
                break;
            case 'PUT':
                console.log(colors.blue.bold(method));
                console.log(url)
                next()
                break;
            case 'DELETE':
                console.log(colors.red.bold(method));
                console.log(url)
                next()
                break;
            default:
                console.log(colors.grey.bold(method));
                console.log(url)
                next()
                break;
        }
    }
}

export const logErrors : ErrorRequestHandler = (error, req, res, next)=>{
    const { url, hostname } = req
    const baseMessage = colors.bgRed.bold('The application crash')
    const infoMessage = colors.red(`
    - origin url : ${url}
    - from : ${hostname}
    `)
    console.log(baseMessage)
    console.log(infoMessage)
    console.error(error)
    res.sendStatus(500)
}