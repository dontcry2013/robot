
import { readCommand, verifyCommands } from './utils';

jest.mock('fs');

describe('readCommand', () => {
  test('should read commands from the file', async () => {
    const filePath = 'correct-path';
    const result = await readCommand(filePath);
    const expected = ['PLACE 0,0,NORTH', 'MOVE', 'LEFT', 'MOVE'];
    expect(result).toEqual(expected);
  });

  test('should throw error', async () => {
    const filePath = 'wrong-path';
    await expect(() => readCommand(filePath)).rejects.toThrowError();
  });
});

describe('verifyCommands', () => {

  describe('When there are Invalid Commands', () => {
    const input = [
      'PLACE 0,2,EAST',
      'MOVE',
      'MOVE',
      'LEFT',
      'dsfsdf',
      'MOVE',
      'ijkjkdsjf',
      'REPORT'
    ];
    const output = [
      'PLACE 0,2,EAST',
      'MOVE',
      'MOVE',
      'LEFT',
      'MOVE',
      'REPORT'
    ];

    test('should get rid of all invalid commands', () => {
      expect(verifyCommands(input)).toEqual(verifyCommands(output))
    });
  });

});