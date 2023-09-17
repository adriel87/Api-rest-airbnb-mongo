import express from 'express'
import cors from 'cors'
import {corsOptions} from '../constant/index.js'
export const createRestApi = () => {
    const server = express()

    server.use(express.json())
    server.use(cors(corsOptions))

    return server;
}