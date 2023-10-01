import { promisify } from 'util';
import childProcess from 'child_process';

export const runCommand = async (command) => {
  console.log(command);
  const { stdout, stderr } = await promisify(childProcess.exec)(command);
  console.log(stdout);
  console.error(stderr);
};

export const runCommands = async (commands : string[]) => {
  for (const command of commands) {
    await runCommand(command)
  }
}
