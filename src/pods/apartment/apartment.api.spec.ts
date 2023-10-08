import supertest from "supertest";

import { connectToDBServer, disconnectFromDBSever, createRestApi } from "#core/index.js"; 
import { apartmentApi } from "./apartment.api.js";
import { Apartment } from './apartment.api-model.js'
import { apartmentContext, } from "#dals/index.js";
import { Collection, ObjectId } from "mongodb";

const app = createRestApi()
app.use(apartmentApi)

const MONGODB_URI = `${globalThis.__MONGO_URI__}${globalThis.__MONGO_DB_NAME__}`;

describe('pods/apartment/apartment.api specs', () => {
  beforeAll(async ()=>{
    await connectToDBServer(MONGODB_URI)
  })

  beforeEach(async ()=>{
    const context = apartmentContext() as Collection<Apartment> 
    await context.insertOne({
      _id: new ObjectId(),
      address:{
        country:'Spain'
      },
      reviews:[],
      bathrooms:{
        $numberDecimal: '1'
      },
      bed_type:'bed',
      bedrooms: 2,
      beds: 4,
      description:'description',
      name:'name',

    })
  })

  afterEach(async ()=>{
    const context = apartmentContext() as Collection<Apartment> 
    await context.deleteMany({})
  })

  afterAll(async()=>{
    await disconnectFromDBSever()
  })
    describe('get apartment list', () => {
      test('', async () => {
        // Arrange
        const route = '/apartments'
        const queryParams = "?page=1&pageSize=1&country=Spain" 
        // Act
        const  response = await supertest(app).get(route + queryParams)
        // Assert
        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveLength(1)
      });
    });
  });