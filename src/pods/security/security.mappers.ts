import { UserSession } from "#common-app/index.js";
import { User as UserModel } from "#dals/user/user.model.js";


export const userSessionFromUserModel = ({id,role}:UserModel) : UserSession => {
    if (id && role) {
        
        return {id, role} 
    }
    return null
}