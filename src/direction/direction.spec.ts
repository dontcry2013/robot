import { parseDirection, processNextMove, Direction } from './direction';

describe('parseDirection', () => {

  describe('When a direction is valid', () => {
    test.each`
      text       | expected
      ${'EAST'}  | ${'EAST'}
      ${'WEST'}  | ${'WEST'}
      ${'NORTH'} | ${'NORTH'}
      ${'SOUTH'} | ${'SOUTH'}
  `('should parse text $text to type $expected', ({ text, expected }) => {
      const result = parseDirection(text);
      expect(result).toBe(expected);
    });
  });


  describe('When a direction is invalid', () => {
    const input = ['NORTHERN', 'SOUTHERN', 'WESTERMN', '', '-', '_'];
    test.each(input)('should throw error when text = %p', (text) => {
      expect(() => parseDirection(text)).toThrowError(`Invalid Direction: ${text}`);
    });
  });

});

describe('processNextMove', () => {

  describe('When a DIRECTION is valid', () => {
    test.each`
      direction  | expected
      ${'EAST'}  | ${{ x: 1, y: 0 }}
      ${'WEST'}  | ${{ x: -1, y: 0 }}
      ${'NORTH'} | ${{ x: 0, y: 1 }}
      ${'SOUTH'} | ${{ x: 0, y: -1 }}
    `('should return the position $expected when direction = $direction', ({ direction, expected }) => {
      const result = processNextMove(direction);
      expect(result).toEqual(expected);
    });
  })

  describe('When a DIRECTION is Invalid', () => {
    const input = ['EASTWEST', 'WESTNORTH', 'NORTHSOUTH', 'SOUTHEAST'];
    test.each(input)('should throw error when the direction is invalid (direction = %p)', (direction) => {
      expect(() => processNextMove(direction as Direction)).toThrowError();
    });
  });
});