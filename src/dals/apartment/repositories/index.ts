import { envConstant } from "#core";
import { apartmentDBRepository } from "./apartment.db-repository";
import { apartmentMockRepository } from "./apartment.mock-repository";
import { ApartmentRespository } from "./apartment.repository";


export const apartmentRepositoryImp : ApartmentRespository = envConstant.API_MOCK 
    ? apartmentMockRepository
    : apartmentDBRepository