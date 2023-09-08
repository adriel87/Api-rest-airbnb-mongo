import { Apartment, Review } from "../apartment.model";
import { ApartmentRespository } from "./apartment.repository";
import { mocksApartment  } from './mock-data'


const PaginatedApartment = (page:number, pageSize: number) : Apartment[] =>{

    let apartmentList = [...mocksApartment]

    if (page && pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, apartmentList.length)
        apartmentList = apartmentList.slice(startIndex, endIndex)
    }
    
    return apartmentList;
}

const getApartmentById = (apartmentId:string) : Apartment => {
    return mocksApartment.find(apartment => apartment.id === apartmentId)
} 

const addNewReviewToApartment = (apartmentId:string, review:Review): boolean =>{
    if (mocksApartment.some(apartmen=> apartmen.id === apartmentId)) {
        mocksApartment.map(apartment => {
            if (apartment.id === apartmentId) {
                apartment.reviews.push(review)
            }
        })   
        return true 
    }
    return false
}




export const apartmentMockRepository : ApartmentRespository = {
    getApartmentList : async (page: number, pageSize:number) => {
        return PaginatedApartment(page,pageSize)
    },
    getApartment: async (apartmentId: string) => {
        return getApartmentById(apartmentId)
    },
    addNewReview: async (apartmentId:string, review:Review) =>{
        return addNewReviewToApartment(apartmentId, review)
    }
}