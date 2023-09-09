

export interface Review {
    id: string
    date?: string
    userName: string
    comment: string
}

export interface Apartment {
    id:string
    name: string
    description: string
    address: string
    rooms: number
    numberOfBeds: number
    numberOfBathrooms: number
    reviews: Review[]
}