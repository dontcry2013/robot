import path from "path";
import Table from "./table/table";
import Robot from "./robot/robot";
import * as display from './types/display';
import { readCommand, verifyCommands } from "./utils/utils";
import { parseCommand } from "./command/command";
import Reader from "./reader/reader";

const TABLE_WIDTH = 5;
const TABLE_HEIGHT = 5;

export const startApplication = async (fileName: string): Promise<void> => {
  display.time('WithoutStream');
  try {
      const filePath = path.resolve(fileName);

      // read commands from the file
      const commands = await readCommand(filePath);

      // create a table with dimenstions
      const table = new Table(TABLE_WIDTH, TABLE_HEIGHT);

      // initalize a robot with a table
      const robot = new Robot(table);

      // validate the commands, get rid of all invalid commands
      const validCommands = verifyCommands(commands);

      // execute commands
      validCommands.forEach(cmd => robot.run(cmd))

      display.timeEnd('WithoutStream');
  } catch (error) {
    display.error('Oops! Something went wrong.', error);
  }
}

export const startApplicationWithStream = async (fileName: string): Promise<void> => {
  display.time('WithStream');
  try {
    const filePath = path.resolve(fileName);

    // create a table with dimenstions
    const table = new Table(TABLE_WIDTH, TABLE_HEIGHT);
    
    // initalize a robot with a table
    const robot = new Robot(table);

    // initalize a file reader
    const reader = new Reader(filePath);

    // read commands from the file
    reader.readByLine((line, event) => {
      let cmd;
      try {
        cmd = parseCommand(line);
      } catch (error) {
        display.log(`${line} has been ignored`);
        cmd = null
      }
      cmd && robot.run(cmd);
      if (event == 'close') {
        display.timeEnd('WithStream');
      }
    });

  } catch (error) {
    display.error('Oops! Something went wrong.', error);
  }
}

export const startApplicationWithStreamByBatch = async (fileName: string, batchSize?: number): Promise<void> => {
  display.time('WithStreamByBatch');
  try {
      const filePath = path.resolve(fileName);

      // create a table with dimenstions
      const table = new Table(TABLE_WIDTH, TABLE_HEIGHT);

      // initalize a robot with a table
      const robot = new Robot(table);
      
      // initalize a file reader
      const reader = new Reader(filePath, batchSize);

      // read commands from the file
      reader.readByBatch((lines, event) => {
        const validCommands = verifyCommands(lines);
        validCommands.forEach(cmd => robot.run(cmd));
        if (event == 'close') {
          display.timeEnd('WithStreamByBatch');
        }
      });

  } catch (error) {
    display.error('Oops! Something went wrong.', error);
  }
  
}
