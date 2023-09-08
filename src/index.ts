import { createRestApi, envConstant } from "#core/index.ts";




const restApiServer = createRestApi();

restApiServer.listen(envConstant.PORT,()=>{

    if (envConstant.API_MOCK) {
        console.log('REST API MOCK MODE');
    }else{
        console.log('REST API CONNECT TO DB');
    }
    console.log(`Running on port ${envConstant.PORT}`);

})