import { Apartment, Review } from "#dals/index.js";
import { ApartmentRespository } from "../apartment.repository.js";




export const apartmentMongooseRepository : ApartmentRespository = {
    getApartmentList: function (page?: number, pageSize?: number): Promise<Apartment[]> {
        throw new Error("Function not implemented.");
    },
    getApartment: function (apartmentId: string): Promise<Apartment> {
        throw new Error("Function not implemented.");
    },
    addNewReview: function (apartmentId: string, review: Review): Promise<boolean> {
        throw new Error("Function not implemented.");
    }
}