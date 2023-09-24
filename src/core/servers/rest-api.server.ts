import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {corsOptions} from '../constant/index.js'
export const createRestApi = () => {
    const server = express()

    server.use(express.json())
    server.use(cookieParser())
    server.use(cors(corsOptions))

    return server;
}