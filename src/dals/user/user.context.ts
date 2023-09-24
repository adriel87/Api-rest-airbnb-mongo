import { db, envConstant } from "#core/index.js";
import { User } from "#pods/user/user.api-model.js";


const userContext = ()=> db.collection<User>(envConstant.MONGODB_USER_COLLECTION)


export default userContext