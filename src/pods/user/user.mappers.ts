import { User as UserModel } from '#dals/index.js'
import { ObjectId } from 'mongodb'
import { User as UserApi } from './user.api-model.js'
import { hashPassword } from '#common/index.js'
import { envConstant } from '#core/index.js'


export const userFromModelToApi = (user: UserModel): UserApi => ({
    createDate: user.createDate,
    email: user.email,
    enable: user.enable,
    _id: new ObjectId(),
    name: user.name,
    role: user.role,
    password: ""
})

export const userFromApiToModel = (user: UserApi) : UserModel => ({
    id: user._id.toHexString(),
    createDate: user.createDate,
    email: user.email,
    enable: user.enable,
    name: user.name,
    role: user.role,
    password: user.password

})