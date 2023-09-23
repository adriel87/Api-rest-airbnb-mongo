import colors from 'colors'
import { isValidMethod, logErrors, showRequestInConsole } from "#common/index.js";
import { connectToDBServer, connectToDBServerWhitMongoose, createRestApi, envConstant } from "#core/index.js";
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
    }else if(envConstant.USE_MONGOOSE){
        await connectToDBServerWhitMongoose( envConstant.MONGODB_URI )
        console.log(colors.bgMagenta.bold('USING MONGOOSE LIBRARY'));
    } else {
        await connectToDBServer(envConstant.MONGODB_URI)
        console.log(colors.bgGreen.bold('USING MONGO DRIVER FOR NODE'));
        console.log('REST API CONNECT TO DB');
    }
    console.log(`Running on port ${envConstant.PORT}`);

})