import { isValidMethod, logErrors, showRequestInConsole } from "#common/index.js";
import { connectToDBServer, createRestApi, envConstant } from "#core/index.js";
import { apartmentApi } from "#pods/apartment/index.js";




const restApiServer = createRestApi();

// middlewares
restApiServer.use(isValidMethod)
restApiServer.use(showRequestInConsole)

restApiServer.use(apartmentApi)

restApiServer.use(logErrors)

restApiServer.listen(envConstant.PORT,async ()=>{

    if (envConstant.API_MOCK) {
        console.log('REST API MOCK MODE');
    }else{
        await connectToDBServer(envConstant.MONGODB_URI)
        console.log('REST API CONNECT TO DB');
    }
    console.log(`Running on port ${envConstant.PORT}`);

})