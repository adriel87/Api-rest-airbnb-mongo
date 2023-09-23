import {  ObjectId } from "mongodb";
import { Review, } from "#dals/index.js";
import { Apartment, apartmentFromApiToModel, listApartmentFromApiToModel, reviewFromModelToApi } from "#pods/index.js";
import { apartmentContext } from "../apartment.context.js";
import { ApartmentRespository } from "./apartment.repository.js";
import { db, envConstant } from "#core/index.ts";


const getApartmentById = async (apartmentId:string) =>{
     const apartmentDB = await db.collection<Apartment>(envConstant.MONGODB_APARTMENT_COLLECTION).findOne(
        {
            _id: new ObjectId(apartmentId)
        },
    )
    const apartment = apartmentFromApiToModel(apartmentDB)
    return apartment
}

const getApartmentListPaginated = async (page: number, pageSize:number) => {

    let startIndex = 0
    if (page && pageSize) {
        startIndex = (page - 1) * pageSize
    }

    const apartmentsDB = await db.collection<Apartment>(envConstant.MONGODB_APARTMENT_COLLECTION)
        .find({},{
            skip:startIndex,
            limit:pageSize ?? 10
        })
        .toArray()
    
    const apartments = listApartmentFromApiToModel(apartmentsDB)
    return apartments
    
}

const addNewReviewToApartment = async (apartmentId:string, review:Review) => {
    const apiReview = reviewFromModelToApi(review)
    const isUpdated = await db.collection<Apartment>(envConstant.MONGODB_APARTMENT_COLLECTION).updateOne(
        {
         _id: new ObjectId(apartmentId)
        },
        {
            $push: {reviews: apiReview},
        }
    )

    return Boolean(isUpdated.modifiedCount)
}


export const apartmentDBRepository : ApartmentRespository = {

    getApartmentList : async (page: number, pageSize:number) => {
     const apartments = await getApartmentListPaginated(page,pageSize)
     return apartments
    },
    getApartment: async (apartmentId: string) => {
        const apartment = await getApartmentById(apartmentId)
       return apartment
    },
    addNewReview: async (apartmentId:string, review:Review) =>{
       const isReviewAdded = addNewReviewToApartment(apartmentId,review)
       return isReviewAdded
    }
}