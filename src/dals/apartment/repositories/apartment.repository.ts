import { Apartment, Review } from "../apartment.model.js";


export interface ApartmentRespository {
    getApartmentList: (country: string, page?:number, pageSize?:number ) => Promise<Apartment[]>
    getApartment: (apartmentId:string) => Promise<Apartment>
    addNewReview: (apartmentId:string, review:Review) => Promise<boolean>
    updateApartment: (apartment: Apartment, apartmentId:string) => Promise<boolean>
}