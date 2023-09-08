import { Review, Apartment as model } from '#dals/index.ts'
import { AirbnbApartments as apiModel } from '#pods/index.ts'



export const apartmentFromApiToModel = (apartment : apiModel) : model=> ({
    address: apartment.address.street,
    description: apartment.description,
    id:apartment._id,
    name:apartment.name,
    numberOfBathrooms: Number(apartment.bathrooms.$numberDecimal),
    numberOfBeds: apartment.beds,
    // TODO: review mapper
    reviews:apartment.reviews as Review[],
    rooms:apartment.bedrooms
})

export const apartmentFromModelToApi = (apartment: model): apiModel => ({
    // TODO: from model to api mapper
    
})