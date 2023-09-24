import { Apartment, Review } from "#dals/index.js";
import { ObjectId } from "mongodb";
import { apartmentContext, mongooseContextType } from "../../apartment.context.js";
import { ApartmentRespository } from "../apartment.repository.js";
import { apartmentFromApiToModel, listApartmentFromApiToModel, reviewFromModelToApi } from "#pods/index.js";

export const apartmentMongooseRepository : ApartmentRespository = {
    getApartmentList: async function (page?: number, pageSize?: number): Promise<Apartment[]> {
        const context = apartmentContext() as mongooseContextType;
        let skip = 0;
        const limit = pageSize ? pageSize : 10;
        if (page && pageSize) {
            if (page > 0) {
                skip = (page - 1) * limit;
            }
        }
        const result = await context
            .find()
            .skip(skip)
            .limit(limit)
            .lean();

        // @ts-ignore
        return listApartmentFromApiToModel(result);
    },
    getApartment: async function (apartmentId: string): Promise<Apartment> {
        const context = apartmentContext();

        // @ts-ignore
        const apartment = await context.findById(apartmentId);
        return apartmentFromApiToModel(apartment);
    },
    addNewReview: async function (apartmentId: string, review: Review): Promise<boolean> {
        const context = apartmentContext() as mongooseContextType;
        const newReview = reviewFromModelToApi(review);
        await context.findByIdAndUpdate(apartmentId, {
            $push: {
                reviews: newReview
            }
        });

        return new Promise((res, rej) => res(true));
    },
    updateApartment: function (apartment: Apartment): Promise<boolean> {
        throw new Error("Function not implemented.");
    }
}