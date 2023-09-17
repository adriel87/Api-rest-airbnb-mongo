import colors from 'colors'

import { envConstant } from '#core/index.js';
import { apartmentDBRepository } from './apartment.db-repository.js';
import { apartmentMockRepository } from './apartment.mock-repository.js';
import { ApartmentRespository } from './apartment.repository.js';
import { apartmentMongooseRepository } from './mongoose/apartment.mongoose.repository.js';




export const apartmentRepositoryImp = () : ApartmentRespository => {
    if (envConstant.API_MOCK ) {
        return apartmentMockRepository
    }

    if (envConstant.USE_MONGOOSE) {
        console.log(colors.bgMagenta.bold('USING MONGOOSE LIBRARY'));
        
        return apartmentMongooseRepository
    }else {
        console.log(colors.bgGreen.bold('USING MONGO DRIVER FOR NODE'));
        return apartmentDBRepository
    }
    
}