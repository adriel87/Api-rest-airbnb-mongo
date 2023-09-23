import { db, envConstant } from "#core/index.js";
import { Apartment } from "./apartment.model.js";
import { Apartment as apartmentApi } from '#pods/index.js'
import { ObjectId } from "mongodb";
import { Model, Schema, model, Document } from "mongoose";




const apartmentContextMongoDriver = () => db.collection<apartmentApi>(envConstant.MONGODB_APARTMENT_COLLECTION)


const apartmentSchema = new Schema({
    _id: Schema.Types.ObjectId,
    listing_url: String,
    name: String,
    summary: String,
    space: String,
    description: String,
    neighborhood_overview: String,
    notes: String,
    transit: String,
    access: String,
    interaction: String,
    house_rules: String,
    property_type: String,
    room_type: String,
    bed_type: String,
    minimum_nights: String,
    maximum_nights: String,
    cancellation_policy: String,
    last_scraped: {
        $date: String
    },
    calendar_last_scraped: {
        $date: String
    },
    first_review: {
        $date: String
    },
    last_review: {
        $date: String
    },
    accommodates: Number,
    bedrooms: Number,
    beds: Number,
    number_of_reviews: Number,
    bathrooms: {
        $numberDecimal: String
    },
    amenities: [String],
    price: {
        $numberDecimal: String
    },
    weekly_price: {
        $numberDecimal: String
    },
    monthly_price: {
        $numberDecimal: String
    },
    cleaning_fee: {
        $numberDecimal: String
    },
    extra_people: {
        $numberDecimal: String
    },
    guests_included: {
        $numberDecimal: String
    },
    images: {
        thumbnail_url: String,
        medium_url: String,
        picture_url: String,
        xl_picture_url: String
    },
    host: {
        host_id: String,
        host_url: String,
        host_name: String,
        host_location: String,
        host_about: String,
        host_response_time: String,
        host_thumbnail_url: String,
        host_picture_url: String,
        host_neighbourhood: String,
        host_response_rate: Number,
        host_is_superhost: Boolean,
        host_has_profile_pic: Boolean,
        host_identity_verified: Boolean,
        host_listings_count: Number,
        host_total_listings_count: Number,
        host_verifications: [String]
    },
    address: {
        street: String,
        suburb: String,
        government_area: String,
        market: String,
        country: String,
        country_code: String,
        location: {
            type: String,
            coordinates: [Number],
            is_location_exact: Boolean
        }
    },
    availability: {
        availability_30: Number,
        availability_60: Number,
        availability_90: Number,
        availability_365: Number
    },
    review_scores: {
        review_scores_accuracy: Number,
        review_scores_cleanliness: Number,
        review_scores_checkin: Number,
        review_scores_communication: Number,
        review_scores_location: Number,
        review_scores_value: Number,
        review_scores_rating: Number
    },
    reviews: [
        {
            _id: Schema.Types.ObjectId,
            date: {
                $date: String
            },
            listing_id: String,
            reviewer_id: String,
            reviewer_name: String,
            comments: String
        }
    ]
});


const apartmentContextMongoose = () => model<apartmentApi>(envConstant.MONGODB_APARTMENT_COLLECTION, apartmentSchema, envConstant.MONGODB_APARTMENT_COLLECTION)

export type mongooseContextType = Model<apartmentApi, {}, {}, {}, Document<unknown, {}, apartmentApi> & apartmentApi & Required<{
    _id: ObjectId;
}>, any>

export const apartmentContext = () => envConstant.USE_MONGOOSE 
    ? apartmentContextMongoose()
    : apartmentContextMongoDriver()