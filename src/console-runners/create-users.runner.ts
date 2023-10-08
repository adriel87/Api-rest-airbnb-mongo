import { checkMongoConnection } from "#common/index.js";
import { connectToDBServer, disconnectFromDBSever, envConstant } from "#core/index.js";
import { User, userRepository } from "#dals/index.js";
import inquirer from "inquirer";



export const run = async () => {

  const hasConnection =  await checkMongoConnection(envConstant.MONGODB_URI)
if (hasConnection) {
    console.clear()
    const { role,name, email, password, enable } = await inquirer.prompt([
    {
      name: 'role',
      type: "list",
      message: 'Select a Role',
      choices:['ADMIN','USER']
    },
    {
        name: 'name',
        type:"input",
        message: 'user name'
    },
    {
        name: 'email',
        type:"input",
        message: 'user email'
    },
    {
        name: 'password',
        type:"password",
        message: 'password: '
    },
    {
        name: 'enable',
        type:"confirm",
        message: 'is enable ?? '
    },

])

    await connectToDBServer(envConstant.MONGODB_URI)
    const newUser : User = {
        createDate: new Date(),
        email,
        enable,
        name,
        password,
        role
    } 

    await userRepository.saveUser(newUser)
   
    await disconnectFromDBSever()
}
  

}

  
