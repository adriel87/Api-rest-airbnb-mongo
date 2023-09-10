import { Review } from "../apartment.model";
import { ApartmentRespository } from "./apartment.repository";
import { db, envConstant } from "#core/index.ts";
import { Apartment } from "#pods/index.ts";
import { apartmentFromApiToModel, listApartmentFromApiToModel , reviewFromModelToApi} from '../../../pods/apartment/apartment.mappers'


const getApartmentById = async (apartmentId:string) =>{
     const apartmentDB = await db.collection<Apartment>(envConstant.MONGODB_APARTMENT_COLLECTION).findOne(
        {
            // el tipo proporcionado por mongodb.d.ts no admite el tipo string 
            // cuando el driver realmente lo acepta y en la documentacion oficial
            // se puede buscar por string o number
            _id: apartmentId
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
            limit:pageSize
        })
        .toArray()
    
    const apartments = listApartmentFromApiToModel(apartmentsDB)
    return apartments
    
}

const addNewReviewToApartment = async (apartmentId:string, review:Review) => {
    const apiReview = reviewFromModelToApi(review)
    const isUpdated = await db.collection<Apartment>(envConstant.MONGODB_APARTMENT_COLLECTION).updateOne(
        {
         _id: apartmentId
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