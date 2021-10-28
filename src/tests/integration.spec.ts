import Robot from '../robot/robot';
import Table from '../table/table';
import { verifyCommands } from '../utils/utils';

import testCases from './testCases';

const table = new Table(5, 5);

describe('Integration Tests', () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot(table);
  });

  testCases.forEach(({ commands, output }) => {
    test(`test case should pass`, () => {

      const validCommands = verifyCommands(commands);
      validCommands.forEach(cmd => robot.run(cmd));
      expect({
        x: robot.x,
        y: robot.y,
        direction: robot.direction
      }).toEqual(output);
    });
  });
});