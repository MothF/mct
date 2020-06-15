import {EventEmitter, Injectable, Output} from '@angular/core';
import * as math from 'mathjs';
import {Complex, Matrix} from 'mathjs';
import {FunctionType} from '../models/function.type';
import {RandomService} from './random.service';
import {ComplexUtilsService} from './complex.utils.service';


@Injectable()
export class SolutionFinderService {
  private size: number;
  private start: number;
  private end: number;
  private percent: number;
  private type: FunctionType;
  private vector: Complex[] = [];
  private matrix: Matrix;

  @Output()
  public eventCallback: EventEmitter<{type: FunctionType, initial: Array<Complex>, solved: Array<Complex> }>
    = new EventEmitter<{type: FunctionType, initial: Array<Complex>, solved: Array<Complex> }>();

  constructor(private randomService: RandomService, private complexService: ComplexUtilsService) {
  }

  public setParams(size: number, start: number, end: number, percent: number): void {
    this.size = size;
    this.start = start;
    this.end = end;
    this.percent = percent;
  }

  public setType(value): void {
    this.type = value;
  }

  public initVector(): void {
    if (this.vector.length > 0) {
      this.vector = [];
    }
    switch (this.type) {
      case FunctionType.Complex:
        for (let i = 0; i < this.size; i++) {
          this.vector.push(math.complex(this.randomService.getRandomNumber(), this.randomService.getRandomNumber()));
        }
        this.vector = this.complexService.sort(FunctionType.Complex, this.vector);
        break;
      case FunctionType.Real:
        const step = (this.end - this.start) / this.size;
        let bound = this.start;
        for (let i = 0; i < this.size; i++) {
          this.vector.push(math.complex(bound, this.randomService.getFunctionValues(bound)));
          bound += step;
        }
        break;
    }
  }

  public initMatrix(): void {
    let row: any[];
    let x: number;
    const matrix = new Array<any>();
    for (let j = 0; j < this.size; j++) {
      row = new Array<any>();
      for (let k = 0; k < this.size; k++) {
        x = 2 * math.pi * j * k / this.size;
        row.push(math.complex(math.cos(x), math.sin(x)));
      }
      matrix.push(row);
    }
    this.matrix = math.matrix(matrix);
  }

  private processInput(): Complex[] {
    const f: Complex[] = [];
    switch (this.type) {
      case FunctionType.Real:
        this.vector.forEach((complex) => {
          f.push(math.complex(0, complex.im));
        });
        break;
      case FunctionType.Complex:
        this.vector.forEach((complex) => {
          f.push(complex);
        });
        break;
    }
    return f;
  }

  private solveSystem(f: Complex[]): Complex[] {
    const c: Complex[] = [];
    for (let row = 0; row < this.size; row++) {
      let sum = math.complex(0, 0);
      for (let column = 0; column < this.size; column++) {
        const multiply = this.complexService.multiply(f[column], this.matrix.get([row, column]));
        sum = this.complexService.add(sum, multiply);
      }
      const quotient = this.complexService.divide(sum, math.complex(this.size, 0));
      c.push(quotient);
    }
    return c;
  }

  private nullify(c: Complex[]) {
    const nullifyingNumber = Math.round(this.percent / 100 * this.size);
    for (let i = 0; i < nullifyingNumber; i++) {
      c[i] = math.complex(0, 0);
    }
  }

  private backwardResolving(c: Complex[]): Complex[] {
    const finalSolution: Complex[] = [];
    for (let row = 0; row < this.size; row++) {
      let sum = math.complex(0, 0);
      for (let column = 0; column < this.size; column++) {
        const multiply = this.complexService.multiply(c[column], math.conj(this.matrix.get([row, column])));
        sum = this.complexService.add(sum, multiply);
      }
      finalSolution.push(sum);
    }
    return finalSolution;
  }



  public solve(): void {
    const f: Complex[] = this.processInput();
    const c: Complex[] = this.solveSystem(f);
    this.nullify(c);
    const finalSolution = this.backwardResolving(c);
    if (this.type === FunctionType.Complex) {
      this.complexService.sort(this.type, finalSolution);
    }
    this.eventCallback.emit({type: this.type, initial: this.vector, solved: finalSolution});
  }

}
