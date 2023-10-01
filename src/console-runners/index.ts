import inquirer from "inquirer"; 
import path from 'path'
import url from 'url'
import { getFilesFromDirectory, removeExtension } from "#common/index.js";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const runners = await getFilesFromDirectory(dirname, true)
const runnersChoices= runners?.map(removeExtension, true)

let exit = false;
while (!exit) {
  const answer = await inquirer.prompt({
    name: "consoleRunner",
    type: "list",
    message: "Which console-runner do you want to run?",
    choices: [...runnersChoices, 'exit'],
  });

  if (answer.consoleRunner !== "exit") {
    const { run } = await import(`./${answer.consoleRunner}.runner.js`);
    await run();
  } else {
    exit = true;
  }
}

process.exit()

