import Table from '../table/table';
import * as display from '../types/display'
import { 
  Command,
} from '../command/command';
import { Direction, processNextMove } from '../direction/direction';
import { turnLeft, turnRight } from '../rotation/rotation'

export default class Robot {
  private _table: Table;
  private _x: number;
  private _y: number;
  private _direction: Direction;
  private _isPlaced: boolean;

  constructor(table: Table) {
    this._table = table;
    this._isPlaced = false;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get direction(): Direction {
    return this._direction;
  }

  private place (x: number, y: number, direction: Direction): void {
    if (!this._table.isWithinRange(x, y)) {
      return;
    }
    this._x = x;
    this._y = y;
    this._direction = direction;
    this._isPlaced = true;
  }

  public report = (): void => {
    if (!this._isPlaced) {
      return;
    }
    display.log(`Output: ${this._x},${this._y},${this._direction}`);
  }

  public left(): void {
    if (!this._isPlaced) {
      return;
    }
    this._direction = turnLeft(this._direction);
  }

  public right(): void {
    if (!this._isPlaced) {
      return;
    }
    this._direction = turnRight(this._direction);
  }

  public move(): void {
    if (!this._isPlaced) {
      return;
    }
    const { x, y } = processNextMove(this._direction);
    if (!this._table.isWithinRange(x + this._x, y + this._y)) {
      return;
    }
    this._x += x;
    this._y += y;
  }

  public run (command: Command) {
    switch(command.type) {
      case 'PLACE':
        this.place(command.x, command.y, command.direction)
        break;
      case 'REPORT':
        this.report();
        break;
      case 'LEFT':
        this.left();
        break;
      case 'RIGHT':
        this.right();
        break;
      case 'MOVE':
        this.move();
        break;
    }
  }
}