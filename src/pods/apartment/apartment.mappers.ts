import { ObjectId } from 'mongodb'

import { Review as modelReview, Apartment as model } from '#dals/index.ts'
import { Apartment as apiModel, Review as apiModelReview } from '#pods/index.ts'


export const listApartmentFromApiToModel = (apartments: apiModel[]) : model[] => [...apartments.map(apartmentFromApiToModel)]

export const apartmentFromApiToModel = (apartment : apiModel) : model=> ({
    address: apartment.address.street,
    description: apartment.description,
    id:apartment._id.toString(),
    name:apartment.name,
    numberOfBathrooms: Number(apartment.bathrooms.$numberDecimal),
    numberOfBeds: apartment.beds,
    reviews: listReviewsFromApiToModel(apartment.reviews),
    rooms:apartment.bedrooms
})

export const apartmentFromModelToApi = (apartment: model): apiModel => ({
    _id: new ObjectId(apartment.id),
    address:{
        street: apartment.address
    },
    description:apartment.description,
    name:apartment.name,
    bathrooms:{
        $numberDecimal:apartment.numberOfBathrooms.toString()
    },
    beds:apartment.numberOfBeds,
    bedrooms:apartment.rooms,
    reviews: listReviewsFromModelToApi(apartment.reviews),
})

export const reviewFromApiToModel = (review: apiModelReview) : modelReview =>({
    id: review._id.toString(),
    comment:review.comments,
    userName:review.reviewer_name,
    date:review.date.$date
})

export const listReviewsFromApiToModel = (reviews: apiModelReview[]) : modelReview[] => [...reviews.map(reviewFromApiToModel)]

export const reviewFromModelToApi = (review: modelReview) : apiModelReview => ({
    _id: new ObjectId(),
    comments:review.comment,
    reviewer_name:review.userName,
    date: {
        $date:review.date
    },
    listing_id: "jkakjdhlfkjah",
    reviewer_id: "kajlsdflakjf",
})

export const listReviewsFromModelToApi = (reviews: modelReview[]) : apiModelReview[] => [...reviews.map(reviewFromModelToApi)]