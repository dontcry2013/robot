import path from "path";
import Table from "./table/table";
import Robot from "./robot/robot";
import * as display from './types/display';
import { readCommand, verifyCommands } from "./utils/utils";

export const startApplication = async (): Promise<void> => {
  try {
    
    // get the filename
    const fileName = process.argv[2];

    if (fileName) {
      
      const filePath = path.resolve(fileName);

      try {
        // read commands from the file
        const commands = await readCommand(filePath);

        // validate the commands, get rid of all invalid commands
        const validCommands = verifyCommands(commands);

        // create a table of dimenstion 5 x 5 units
        const table = new Table(5, 5);

        // initalize a robot with a table
        const robot = new Robot(table);

        // execute commands
        validCommands.forEach(cmd => robot.run(cmd))

      } catch (error) {
        
      }

    } else {
      display.log(`Please provide a fileName to run simulation.
      For example: npm start ./src/tests/data/simulation-1`);
    }

  } catch (error) {
    display.error('Oops! Something went wrong.', error);
  }
}

startApplication();