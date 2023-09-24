import { SignOptions } from "jsonwebtoken"


export const jwtBaseSignConfig : SignOptions = {
    expiresIn:'1d',
    algorithm:"HS256"
}