import {EventEmitter, Injectable, Output} from '@angular/core';
import {Complex, Matrix} from 'mathjs';
import {InputType} from '../models/input.type';
import {RandomService} from './random.service';
import * as math from 'mathjs';
import {ComplexUtilsService} from './complex.utils.service';


@Injectable()
export class SolutionFinderService {
  private size: number;
  private start: number;
  private end: number;
  private percent: number;
  private type: InputType;
  private vector: Complex[] = [];
  private matrix: Matrix;

  @Output()
  eventCallback: EventEmitter<{ initial: Array<Complex>, solved: Array<Complex> }>
    = new EventEmitter<{ initial: Array<Complex>, solved: Array<Complex> }>();

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
      case InputType.Complex:
        for (let i = 0; i < this.size; i++) {
          this.vector.push(math.complex(this.randomService.getRandomNumber(), this.randomService.getRandomNumber()));
        }
        this.vector = this.complexService.sort(this.vector);
        break;
      case InputType.Function:
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
        row.push(math.complex(
          math.cos(x),
          math.sin(x)
        ));
      }
      matrix.push(row);
    }
    this.matrix = math.matrix(matrix);
  }

  public solve(): void {
    const f: Complex[] = [];
    switch (this.type) {
      case InputType.Function:
        this.vector.forEach((complex) => {
          f.push(math.complex(complex.im, 0));
        });
        break;
      case InputType.Complex:
        this.vector.forEach((complex) => {
          f.push(complex);
        });
        break;
    }

    const c: Complex[] = [];
    for (let j = 0; j < this.size; j++) {
      let elem = math.complex(0, 0);
      for (let k = 0; k < this.size; k++) {
        elem = this.complexService.add(
          elem,
          this.complexService.multiply(
            math.conj(f[k]),
            math.conj(this.matrix.get([j, k]))
          )
        );
      }
      c.push(math.conj(
        this.complexService.divide(
          elem,
          math.complex(this.size, 0))
        )
      );
    }

    const count = Math.ceil(this.percent / 100 * this.size);
    for (let i = 0; i < count; i++) {
      c[i] = math.complex(0, 0);
    }

    const finalSolution: Complex[] = [];
    for (let k = 0; k < this.size; k++) {
      let elem = math.complex(0, 0);
      for (let j = 0; j < this.size; j++) {
        elem = this.complexService.add(elem, this.complexService.multiply(c[k], math.conj(this.matrix.get([j, k]))));
      }
      finalSolution.push(elem);
    }

    this.eventCallback.emit({initial: this.vector, solved: finalSolution});
  }

}
