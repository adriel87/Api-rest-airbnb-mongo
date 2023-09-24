import { envConstant } from '#core/index.js'
import crypto from 'crypto'
import {promisify} from 'util'

const randomBytes = promisify(crypto.randomBytes)
const pbkdf2 = promisify(crypto.pbkdf2)

const saltLength = envConstant.SALT_LENGTH

export const generateSalt =async (): Promise<string> => {
    const salt = await randomBytes(saltLength)
    return salt.toString('hex')
}

const passwordLength = envConstant.PASSWORD_LENGTH
const digestAlgorithm = 'sha512'
const iterations = 100000

export const hashPassword =async (password:string, salt:string): Promise<string> => {
    const hashedPassword = await pbkdf2(
        password,
        salt,
        iterations,
        passwordLength,
        digestAlgorithm
    )

    return hashedPassword.toString('hex')
}