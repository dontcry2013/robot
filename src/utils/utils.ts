import { Command, parseCommand } from '../command/command';
import * as display from '../types/display';
import fs from 'fs';

export const readCommand =  (filePath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    })
  }).then((text: string) => {
    return text.split(/\r?\n/).filter((line) => !!line)
  })
}

export const verifyCommands = (commands: string[]): Command[] => {
  return commands.map(cmd => {
    try {
      return parseCommand(cmd)  
    } catch (error) {
      display.log(`${cmd} has been ignored`);
      return null
    }
  }).filter(cmd => !!cmd);
}