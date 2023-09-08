import { Review } from "../apartment.model";
import { ApartmentRespository } from "./apartment.repository";







export const apartmentDBRepository : ApartmentRespository = {
    getApartmentList : async (page: number, pageSize:number) => {
     throw new Error('implementation needed')
    },
    getApartment: async (apartmentId: string) => {
        throw new Error('implementation needed')
    },
    addNewReview: async (apartmentId:string, review:Review) =>{
        throw new Error('implement needed')
    }
}