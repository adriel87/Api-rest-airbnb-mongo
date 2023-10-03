import { ObjectId } from 'mongodb'

import { Review as modelReview, Apartment as model } from '#dals/index.js'
import { Apartment as apiModel, Review as apiModelReview } from '#pods/index.js'


export const listApartmentFromApiToModel = (apartments: apiModel[]) : model[] => apartments ? [...apartments.map(apartmentFromApiToModel)] : []

export const apartmentFromApiToModel = (apartment : apiModel) : model=> ({
    address: apartment?.address?.street ?? '',
    description: apartment?.description ?? '',
    id:apartment?._id.toString() ?? '',
    name:apartment?.name ?? '',
    numberOfBathrooms: Number(apartment?.bathrooms?.$numberDecimal ?? 0),
    numberOfBeds: apartment?.beds ?? 0,
    reviews: listReviewsFromApiToModel(apartment?.reviews ?? []),
    rooms:apartment?.bedrooms ?? 0
})

export const apartmentFromModelToApi = (apartment: model): apiModel => ({
    _id: apartment?.id ? new ObjectId(apartment.id) : new ObjectId(),
    address:{
        street: apartment?.address ?? ''
    },
    description:apartment?.description ?? '',
    name:apartment?.name ?? '',
    bathrooms:{
        $numberDecimal:apartment?.numberOfBathrooms?.toString() ?? '0'
    },
    beds:apartment?.numberOfBeds ?? 0,
    bedrooms:apartment?.rooms ?? 0,
    reviews: listReviewsFromModelToApi(apartment?.reviews ?? []),
})

export const reviewFromApiToModel = (review: apiModelReview) : modelReview =>({
    id: review?._id.toString() ?? null,
    comment:review?.comments ?? '',
    userName:review?.reviewer_name ?? '',
    date:review?.date?.$date ?? ''
})

export const listReviewsFromApiToModel = (reviews: apiModelReview[]) : modelReview[] => reviews ? [...reviews.map(reviewFromApiToModel)] : []

export const reviewFromModelToApi = (review: modelReview) : apiModelReview => ({
    _id: new ObjectId(),
    comments: review?.comment ?? '',
    reviewer_name:review?.userName ?? '',
    date: {
        $date:review?.date ?? ''
    },
    listing_id: review ? new ObjectId().toHexString() : null,
    reviewer_id: review ? new ObjectId().toHexString() : null,
})

export const listReviewsFromModelToApi = (reviews: modelReview[]) : apiModelReview[] => [...reviews.map(reviewFromModelToApi)]
