import { Review, } from "#dals/index.js";
import { Apartment as ApartmentApi, apartmentFromApiToModel, apartmentFromModelToApi, listApartmentFromApiToModel, reviewFromModelToApi } from "#pods/index.js";
import { Apartment as ApartmentModel } from '#dals/index.js'
import { Collection, ObjectId } from "mongodb";
import { apartmentContext } from "#dals/index.js";
import { ApartmentRespository } from "./apartment.repository.js";

import { db, envConstant } from "#core/index.js";


const getApartmentById = async (apartmentId:string) =>{
     const apartmentDB = await db.collection<ApartmentApi>(envConstant.MONGODB_APARTMENT_COLLECTION).findOne(
        {
            _id: new ObjectId(apartmentId)
        },
    )
    const apartment = apartmentFromApiToModel(apartmentDB)
    return apartment
}

const getApartmentListPaginated = async (country: string, page: number, pageSize:number) => {
    const apartmentCollection = apartmentContext() as Collection<ApartmentApi>
    let startIndex = 0
    if (page && pageSize) {
        startIndex = (page - 1) * pageSize
    }

    const apartmentsDB = await apartmentCollection
        .find({
            'address.country':country
        },{
            skip:startIndex,
            limit:pageSize ?? 10
        })
        .toArray()
    
    const apartments = listApartmentFromApiToModel(apartmentsDB)
    return apartments
    
}

const addNewReviewToApartment = async (apartmentId:string, review:Review) => {
    const apartmentCollection = apartmentContext() as Collection<ApartmentApi>
    const apiReview = reviewFromModelToApi(review)
    const isUpdated = await apartmentCollection.updateOne(
        {
         _id: new ObjectId(apartmentId)
        },
        {
            $push: {reviews: apiReview},
        }
    )

    return Boolean(isUpdated.modifiedCount)
}

const updateApartment = async (apartment:ApartmentApi, apartmentId: string) =>{
    const apartmentCollection = apartmentContext() as Collection<ApartmentApi>
    const isUpdated = await apartmentCollection.findOneAndUpdate(
        {
            _id: new ObjectId(apartmentId)
        },
        {
            $set:{
                address: apartment.address,
                descriptionL: apartment.description,
                name: apartment.name,
                bathrooms: apartment.bathrooms,
                bedrooms:apartment.bedrooms,
                beds: apartment.beds
            }
        }
    )
    return Boolean(isUpdated)
}


export const apartmentDBRepository : ApartmentRespository = {

    getApartmentList : async (country:string, page: number, pageSize:number) => {
     const apartments = await getApartmentListPaginated(country,page,pageSize)
     return apartments
    },
    getApartment: async (apartmentId: string) => {
        const apartment = await getApartmentById(apartmentId)
       return apartment
    },
    addNewReview: async (apartmentId:string, review:Review) =>{
       const isReviewAdded = addNewReviewToApartment(apartmentId,review)
       return isReviewAdded
    },
    updateApartment:async (apartment:ApartmentModel, apartmentId:string) => {
        const apiApartment = apartmentFromModelToApi(apartment)
        const isApartmentUpdated = await updateApartment(apiApartment, apartmentId)
        return isApartmentUpdated
    }
}