import { Db, MongoClient, MongoClientOptions } from "mongodb"

export let db :Db
let client : MongoClient;

export const connectToDBServer = async (url:string, options?:MongoClientOptions) =>{
    client = new MongoClient(url, options);

    await client.connect()
    console.log(`Conected succesfully to server : ${url}`);
    db = client.db()

}

export const disconnectFromDBSever = async ()=>{
    await client.close()
}