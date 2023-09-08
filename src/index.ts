import { createRestApi, envConstant } from "#core/index.ts";
import { apartmentApi } from "#pods/apartment/index.ts";




const restApiServer = createRestApi();

restApiServer.use(apartmentApi)

restApiServer.listen(envConstant.PORT,()=>{

    if (envConstant.API_MOCK) {
        console.log('REST API MOCK MODE');
    }else{
        console.log('REST API CONNECT TO DB');
    }
    console.log(`Running on port ${envConstant.PORT}`);

})