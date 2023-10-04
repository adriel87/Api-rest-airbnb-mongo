import { Apartment, Review } from "../apartment.model.js";
import { ApartmentRespository } from "./apartment.repository.js";
import { mocksApartment  } from './mock-data.js'


const PaginatedApartment = (country:string,page:number, pageSize: number) : Apartment[] =>{

    let apartmentList = [...mocksApartment]
    apartmentList = apartmentList.filter(apartment=>apartment.country === country)

    if (apartmentList.length === 0) return apartmentList

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

const updateApartment = (apartment:Apartment) : boolean=> {
    if (mocksApartment.find(a => apartment.id === a.id)) {
        mocksApartment.map(a =>{
            if (a.id === apartment.id) {
                return {
                    ...apartment
                }
            }
            return a
        })
        return true
    }
    return false
}




export const apartmentMockRepository : ApartmentRespository = {
    getApartmentList : async (country:string,page: number, pageSize:number) => {
        return PaginatedApartment(country,page,pageSize)
    },
    getApartment: async (apartmentId: string) => {
        return getApartmentById(apartmentId)
    },
    addNewReview: async (apartmentId:string, review:Review) =>{
        return addNewReviewToApartment(apartmentId, review)
    },
    updateApartment:async (apartment) => {
        return updateApartment(apartment)
    }
}