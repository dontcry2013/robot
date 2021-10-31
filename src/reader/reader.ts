import fs, { ReadStream } from 'fs';
import readline from 'readline';

export default class Reader {
  private _filePath: string;
  private _input: ReadStream;
  private _lineNumber: number;
  private _batchSize: number;
  private _data: string[];

  constructor(filePath: string, batchSize?: number) {
    this._filePath = filePath;
    this._input = fs.createReadStream(filePath);
    this._lineNumber = 0;
    this._batchSize = batchSize || 100;
    this._data = [];
  }

  get filePath(): string {
    return this._filePath;
  }

  get batchSize(): number {
    return this._batchSize;
  }

  public readByBatch = async (cb: (lines: string[], event: string) => void) => {
    const rl = readline.createInterface({
      input: this._input,
      crlfDelay: Infinity
    });
    
    rl.on('line', (line) => {
      ++this._lineNumber;
      this._data.push(line);
      if (this._lineNumber % this._batchSize === 0) {
        cb(this._data, 'line');
        this._data = [];
      }
    });

    rl.on('close', () => {
      cb(this._data, 'close');
      this._data = [];
    })
  }

  public readByLine = async (cb: (line: string, event: string) => void) => {
    const rl = readline.createInterface({
      input: this._input,
      crlfDelay: Infinity
    });
    
    rl.on('line', (line) => {
      cb(line, 'line');      
    });

    rl.on('close', () => {
      cb('', 'close');
    })
  }

}