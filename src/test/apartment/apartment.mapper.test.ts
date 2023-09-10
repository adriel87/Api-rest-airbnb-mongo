import colors from 'colors'
import { ObjectId } from 'mongodb'
import { apartmentFromApiToModel, apartmentFromModelToApi, Apartment as apiModel, Review as apiReview, reviewFromApiToModel, reviewFromModelToApi} from "#pods/index.ts"
import { Apartment as domainModel, Review as domainReview } from '#dals/index.ts'

describe(colors.bgGreen.bold(' Apartment mappers '), ()=>{

    describe(colors.green('From api model to domain model'), ()=>{
    
        
        test('whit valid api model we obtain a valid domain model', () => {
            // arrange
            const apartmentFromApiModel : apiModel = {
                _id:new ObjectId(),
                name: 'el test suite',
                description: 'un super lugar de amor',
                address:{
                    street:'entre un sitio y otro'
                },
                bedrooms: 10,
                beds:2,
                bathrooms:{
                    $numberDecimal:'1.0'
                },
                reviews:[]
            }
            
            // act
            const apartment = apartmentFromApiToModel(apartmentFromApiModel)
            // assert
            expect(apartment.name).toBe('el test suite')
            expect(apartment.description).toStrictEqual('un super lugar de amor')
            expect(apartment.address).toStrictEqual('entre un sitio y otro')
            expect(apartment.rooms).toStrictEqual(10)
            expect(apartment.numberOfBeds).toStrictEqual(2)
            expect(apartment.numberOfBathrooms).toEqual(1)
            expect(apartment.reviews).toMatchObject([])
        })
    
        test('whit empty api model we obtain a empty valid domain model', ()=> {
            // arrange
            const nullApartment = null;
            // act
            const apartment = apartmentFromApiToModel(nullApartment)
            // assert
            expect(apartment.name).toBe('')
            expect(apartment.description).toStrictEqual('')
            expect(apartment.address).toStrictEqual('')
            expect(apartment.rooms).toStrictEqual(0)
            expect(apartment.numberOfBeds).toStrictEqual(0)
            expect(apartment.reviews).toMatchObject([])
            
        })
    
    })
    describe(colors.green('From domain model to api model'), ()=>{
    
        
        test('whit valid domain model we obtain a valid api model', () => {
            // arrange
            const apartmentFromApiModel : domainModel = {
                address:'address',
                description:'description',
                name:'name',
                numberOfBathrooms:1,
                numberOfBeds: 1,
                reviews:[],
                rooms:1
            }
            
            // act
            const apartment = apartmentFromModelToApi(apartmentFromApiModel)
            // assert
            expect(apartment.name).toBe('name')
            expect(apartment.description).toStrictEqual('description')
            expect(apartment.address.street).toStrictEqual('address')
            expect(apartment.bedrooms).toStrictEqual(1)
            expect(apartment.beds).toStrictEqual(1)
            expect(apartment.bathrooms.$numberDecimal).toStrictEqual('1')
            expect(apartment.reviews).toMatchObject([])
        })
    
        test('whit empty api model we obtain a empty valid domain model', ()=> {
            // arrange
            const nullApartment = null;
            // act
            const apartment = apartmentFromModelToApi(nullApartment)
            // assert
            expect(apartment.name).toBe('')
            expect(apartment.description).toStrictEqual('')
            expect(apartment.address.street).toStrictEqual('')
            expect(apartment.bedrooms).toStrictEqual(0)
            expect(apartment.beds).toStrictEqual(0)
            expect(apartment.bathrooms.$numberDecimal).toStrictEqual('0')
            expect(apartment.reviews).toMatchObject([])
            
        })
    })
})

describe(colors.bgGreen.bold(' Review mappers '), ()=>{
    describe(colors.green("From api review to domain review"),()=>{
        test("whit valid api review get a valid domain review",()=>{
            // arrange
            const apiReview : apiReview= {
                _id: new ObjectId(),
                comments: 'comments',
                date:{
                    $date:'date'
                },
                listing_id:'listing_id',
                reviewer_id:'review_id',
                reviewer_name:'paco'
            }
            // act
            const review = reviewFromApiToModel(apiReview)
            // assert
            expect(review.comment).toBe('comments')
            expect(review.date).toBe('date')
            expect(review.id).not.toBeNull()
            expect(review.userName).toBe('paco')
        })

        test("whit null api review get a valid empty domain review", ()=>{
            // arrange
            const apiReview = null
            // act
            const review = reviewFromApiToModel(apiReview)
            // assert
            expect(review.comment).toBe('')
            expect(review.date).toBe('')
            expect(review.id).toBeNull()
            expect(review.userName).toBe('')
        })
    })
    describe(colors.green("From domain review to api review"),()=>{
        test("whit valid domain review get a valid api review",()=>{
            // arrange
            const modelReview : domainReview= {
                comment: 'comment',
                date:"date",
                userName:'paco'
            }
            // act
            const review = reviewFromModelToApi(modelReview)
            // assert
            expect(review.comments).toBe('comment')
            expect(review.date.$date).toBe('date')
            expect(review._id).not.toBeNull()
            expect(review.reviewer_name).toBe('paco')
            expect(review.listing_id).toBeNull()
            expect(review.reviewer_id).toBeNull()

        })

        test("whit null domain review get a valid empty api review", ()=>{
            // arrange
            const modelReview = null
            // act
            const review = reviewFromModelToApi(modelReview)
            // assert
            expect(review.comments).toBe('')
            expect(review.date.$date).toBe('')
            expect(review._id).not.toBeNull()
            expect(review.reviewer_name).toBe('')
            expect(review.listing_id).toBeNull()
            expect(review.reviewer_id).toBeNull()
        })
    })
})
