import { EventEmitter, Injectable, Output } from '@angular/core';
import { Complex, Matrix } from 'mathjs';
import { InputType } from '../models/input.type';
import { RandomService } from './random.service';
import * as math from 'mathjs';


@Injectable()
export class SolutionFinderService {
  constructor(private randomService: RandomService) {
  }


  private size: number;
  private start: number;
  private end: number;
  private type: InputType;
  private f: Array<any> = new Array<any>();
  private A: Matrix;

  @Output()
  eventCallback: EventEmitter<any> = new EventEmitter<any>();

  public setSizeAndSegment(size: number, start: number, end: number): void {
    this.size = size;
    this.start = start;
    this.end = end;
  }

  public setType(value): void {
    this.type = value;
  }

  public initVector(): void {
    if (this.f) {
      this.f = new Array<any>();
    }
    switch (this.type) {
      case InputType.Complex:
        for (let i = 0; i <= this.size; i++) {
          this.f.push(math.complex(this.randomService.getRandomNumber(), this.randomService.getRandomNumber()));
        }
        this.f.sort((a: Complex, b: Complex): number => {
          if (a.re < b.re) {
            return -1;
          }
          if (a.re > b.re) {
            return 1;
          }
          return a.re - b.re;
        });
        this.eventCallback.emit(this.f);
        console.log(this.f.length);
        break;
      case InputType.Function:
        const step = (this.end - this.start) / this.size;
        let bound = this.start;
        while (bound <= this.end) {
          this.f.push(math.complex(bound, this.randomService.getFunctionValues(bound)));
          bound += step;
        }
        this.eventCallback.emit(this.f);
        console.log(this.f.length);
        break;
    }
  }

  public initMatrix(): void {
    let row: any[];
    let x: number;
    const matrix = new Array<any>();
    for (let j = 0; j <= this.size; j++) {
      row = new Array<any>();
      for (let k = 0; k <= this.size; k++) {
        x = 2 * math.pi * j * k / this.size;
        row.push(math.complex(
          math.cos(x),
          math.sin(x)
        ));
      }
      matrix.push(row);
    }
    this.A = math.matrix(matrix);
  }
}
