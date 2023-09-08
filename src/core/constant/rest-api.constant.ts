import { CorsOptions } from 'cors'
import { envConstant } from '.'

export const corsOptions : CorsOptions= {
    methods: envConstant.CORS_METHODS,
    origin: envConstant.CORS_ORIGIN,
    credentials: envConstant.CORS_CREDENTIALS
}