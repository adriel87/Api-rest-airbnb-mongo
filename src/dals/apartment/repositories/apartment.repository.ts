import { Apartment, Review } from "../apartment.model";


export interface ApartmentRespository {
    getApartmentList: (page?:number, pageSize?:number) => Promise<Apartment[]>
    getApartment: (apartmentId:string) => Promise<Apartment>
    addNewReview: (apartmentId:string, review:Review) => Promise<boolean>
}