import { checkMongoConnection, runCommands } from "#common/index.js";
import { envConstant } from "#core/index.js";
import inquirer from "inquirer";

const workdir = '/opt/app'


export const run = async () => {

  const hasConnection =  await checkMongoConnection(envConstant.MONGODB_URI)
  if (hasConnection) {

    const { path } = await inquirer.prompt({
      name: "path",
      type: "input",
      message: "absolute path: ",
    });

    const { folderName } = await inquirer.prompt({
      name: "folderName",
      type: "input",
      message: "Folder name: ",
    });

    const { containerName } = await inquirer.prompt({
      name:'containerName',
      type: "input",
      message: "name of docker container: "
    })

    const commandsToRun = [
      `docker compose up -d`,
      `docker cp ${path}  ${containerName}:${workdir}`,
      `docker exec --workdir ${workdir} ${containerName} mongorestore --db ${folderName} .`,
      'docker compose down'
    ]

    await runCommands(commandsToRun)

  }

  
};
