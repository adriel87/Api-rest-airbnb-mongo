import { db, envConstant } from "#core/index.js";
import { Apartment } from "#pods/index.js";
import { Schema, model } from "mongoose";




const apartmentContextMongoDriver = () => db.collection<Apartment>(envConstant.MONGODB_APARTMENT_COLLECTION)

const apartmentSchema = new Schema<Apartment>({
    listing_url: { type: Schema.Types.String },
    name: { type: Schema.Types.String },
    summary: { type: Schema.Types.String },
    space: { type: Schema.Types.String },
    description: { type: Schema.Types.String },
    neighborhood_overview: { type: Schema.Types.String },
    notes: { type: Schema.Types.String },
    transit: { type: Schema.Types.String },
    access:{ type: Schema.Types.String },
    interaction: { type: Schema.Types.String },
    house_rules: { type: Schema.Types.String },
    property_type: { type: Schema.Types.String },
    room_type: { type: Schema.Types.String },
    bed_type: { type: Schema.Types.String },
    minimum_nights: { type: Schema.Types.String },
    maximum_nights: { type: Schema.Types.String },
    cancellation_policy: { type: Schema.Types.String },
    last_scraped:{
        $date: { type: Schema.Types.String },
    },
    calendar_last_scraped:{
        $date: { type: Schema.Types.String },
    },
    first_review:{
        $date: { type: Schema.Types.String },
    },
    accommodates:{ type: Schema.Types.Number },
    bedrooms:{ type: Schema.Types.Number },
    beds:{ type: Schema.Types.Number },
    number_of_reviews:{ type: Schema.Types.Number },
    bathrooms:{
        $numberDecimal: { type: Schema.Types.String },
    },
    // todo: see how type string array in mongoose
    // amenities: { type: Schema.
    //  },
    price:{
        $numberDecimal:{ type: Schema.Types.Number },
    },
    cleaning_fee:{
        $numberDecimal:{ type: Schema.Types.Number },
    },
    extra_people:{
        $numberDecimal:{ type: Schema.Types.Number },
    },
    guests_included:{
        $numberDecimal:{ type: Schema.Types.Number },
    },
    // images:{type:Schema.Types.Subdocument},
    // host:{type:Schema.Types.Subdocument},
    // address:{type:Schema.Types.Subdocument},
    // availability:{type:Schema.Types.Subdocument},
    // review_scores:{type:Schema.Types.Subdocument},
    // todo: review type
    // reviews:{}


})

const apartmentContexMongoose = () => model<Apartment>(envConstant.MONGODB_APARTMENT_COLLECTION, apartmentSchema)


export const apartmentContext = () => envConstant.USE_MONGOOSE 
    ? apartmentContexMongoose()
    : apartmentContextMongoDriver()