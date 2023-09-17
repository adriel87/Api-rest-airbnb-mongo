import mongoose, { Mongoose } from 'mongoose'

export let dbMongoose : Mongoose

export const connectToDBServerWhitMongoose = async (url:string) => {
    await mongoose.connect(url)
    console.log(`Connect to DB succefuly thank you mongoose : ${url}`)
}