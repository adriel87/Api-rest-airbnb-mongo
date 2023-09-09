import { Review } from "../apartment.model";
import { ApartmentRespository } from "./apartment.repository";
import { db, envConstant } from "#core/index.ts";
import { Apartment } from "#pods/index.ts";
import { apartmentFromApiToModel, listApartmentFromApiToModel } from '../../../pods/apartment/apartment.mappers'


const getApartmentById = async (apartmentId:string) =>{
    const apartmentDB = await db.collection<Apartment>(envConstant.MONGODB_APARTMENT_COLLECTION).findOne()
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
        throw new Error('implement needed')
    }
}