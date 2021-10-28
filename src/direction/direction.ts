import { Position } from '../types/position'

export type EAST = 'EAST';
export type WEST = 'WEST';
export type NORTH = 'NORTH';
export type SOUTH = 'SOUTH';

export type Direction = EAST | WEST | NORTH | SOUTH;

export const parseDirection = (text: string): Direction => {
  switch (text && text.toUpperCase()) {
    case 'NORTH':
      return 'NORTH';
    case 'SOUTH':
      return 'SOUTH';
    case 'WEST':
      return 'WEST';
    case 'EAST':
      return 'EAST';
    default:
      throw new Error(`Invalid Direction: ${text}`);
  }
};

export type NextDirection = {
  [direction in Direction]: Position;
};

export const nextMove: NextDirection = {
  'EAST': {
    x: 1,
    y: 0
  },
  'WEST': {
    x: -1,
    y: 0,
  },
  'NORTH': {
    x: 0,
    y: 1,
  },
  'SOUTH': {
    x: 0,
    y: -1,
  }
};

export const processNextMove = (direction: Direction): Position => {
  if (nextMove[direction]) return nextMove[direction];
  throw new Error(`Invalid Direction: ${direction}`);
};