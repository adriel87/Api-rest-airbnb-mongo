

export interface AirbnbApartments {
    _id?:                   string;
    listing_url?:           string;
    name?:                  string;
    summary?:               string;
    space?:                 string;
    description?:           string;
    neighborhood_overview?: string;
    notes?:                 string;
    transit?:               string;
    access?:                string;
    interaction?:           string;
    house_rules?:           string;
    property_type?:         string;
    room_type?:             string;
    bed_type?:              string;
    minimum_nights?:        string;
    maximum_nights?:        string;
    cancellation_policy?:   string;
    last_scraped?:          LastScraped;
    calendar_last_scraped?: LastScraped;
    accommodates?:          number;
    bedrooms?:              number;
    beds?:                  number;
    number_of_reviews?:     number;
    bathrooms?:             Bathrooms;
    amenities?:             string[];
    price?:                 Bathrooms;
    weekly_price?:          Bathrooms;
    monthly_price?:         Bathrooms;
    cleaning_fee?:          Bathrooms;
    extra_people?:          Bathrooms;
    guests_included?:       Bathrooms;
    images?:                Images;
    host?:                  Host;
    address?:               Address;
    availability?:          Availability;
    review_scores?:         ReviewScores;
    reviews?:               any[];
}

export interface Address {
    street?:          string;
    suburb?:          string;
    government_area?: string;
    market?:          string;
    country?:         string;
    country_code?:    string;
    location?:        Location;
}

export interface Location {
    type?:              string;
    coordinates?:       number[];
    is_location_exact?: boolean;
}

export interface Availability {
    availability_30?:  number;
    availability_60?:  number;
    availability_90?:  number;
    availability_365?: number;
}

export interface Bathrooms {
    $numberDecimal?: string;
}

export interface LastScraped {
    $date?: Date;
}

export interface Host {
    host_id?:                   string;
    host_url?:                  string;
    host_name?:                 string;
    host_location?:             string;
    host_about?:                string;
    host_thumbnail_url?:        string;
    host_picture_url?:          string;
    host_neighbourhood?:        string;
    host_is_superhost?:         boolean;
    host_has_profile_pic?:      boolean;
    host_identity_verified?:    boolean;
    host_listings_count?:       number;
    host_total_listings_count?: number;
    host_verifications?:        string[];
}

export interface Images {
    thumbnail_url?:  string;
    medium_url?:     string;
    picture_url?:    string;
    xl_picture_url?: string;
}

export interface ReviewScores {
}
