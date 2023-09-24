import { Role } from "#common-app/index.js";
import { User } from "../user.model.js";

export interface UserRepository {
    getUserById: (id: string) => Promise<User>,
    getUserByEmailAndPassword: (email:string, password:string) => Promise<User>
    saveUser: (user: User) => Promise<User>,
    updateUserRole: (role:Role,  userId: string) => Promise<boolean>
}