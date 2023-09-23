import { Db, MongoClient, MongoClientOptions } from "mongodb"

export let db :Db

export const connectToDBServer = async (url:string, options?:MongoClientOptions) =>{
    const client = new MongoClient(url, options);

    await client.connect()
    console.log(`Conected succesfully to server : ${url}`);
    db = client.db()

}