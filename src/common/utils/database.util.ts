import { envConstant } from '#core/index.js';
import { MongoClient, MongoClientOptions} from 'mongodb'

export const checkMongoConnection = async (url: string, options?:MongoClientOptions) => {
        let isValidMongoConnection = false
        try {
            const client = new MongoClient(url, options);
            await client.connect()
            isValidMongoConnection = true
        } catch (error) {
            console.log(error);
        }
        return isValidMongoConnection
}