

export interface Review {
    date?: string
    userName: string
    comment: string
}

export interface Apartment {
    name: string
    description: string
    address: string
    rooms: number
    numberOfBeds: number
    numberOfBathrooms: number
    reviews: Review[]
}