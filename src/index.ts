import { createRestApi, envConstant } from "#core/index.ts";




const restApiServer = createRestApi();

restApiServer.listen(envConstant.PORT,()=>{

    console.log(`Running on port ${envConstant.PORT}`);
    

})