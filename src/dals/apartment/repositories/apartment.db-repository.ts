import { Review, } from "#dals/index.js";
import { Apartment, apartmentFromApiToModel, listApartmentFromApiToModel, reviewFromModelToApi } from "#pods/index.js";
import { Collection, ObjectId } from "mongodb";
import { apartmentContext } from "./apartment.context.js";
import { ApartmentRespository } from "./apartment.repository.js";


const getApartmentById = async (apartmentId:string, ) =>{
     const apartmentCollection = apartmentContext() as Collection<Apartment>
     const apartmentDB = await apartmentCollection
        .findOne(
            {
                _id: new ObjectId(apartmentId)
            },
        )
    const apartment = apartmentFromApiToModel(apartmentDB)
    return apartment
}

const getApartmentListPaginated = async (page: number, pageSize:number) => {
    const apartmentCollection = apartmentContext() as Collection<Apartment>
    let startIndex = 0
    if (page && pageSize) {
        startIndex = (page - 1) * pageSize
    }

    const apartmentsDB = await apartmentCollection
        .find({},{
            skip:startIndex,
            limit:pageSize
        })
        .toArray()
    
    const apartments = listApartmentFromApiToModel(apartmentsDB)
    return apartments
    
}

const addNewReviewToApartment = async (apartmentId:string, review:Review) => {
    const apartmentCollection = apartmentContext() as Collection<Apartment>
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