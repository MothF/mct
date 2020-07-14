import {Injectable} from '@angular/core';
import * as math from 'mathjs';
import {Complex} from 'mathjs';
import {FunctionType} from '../models/function.type';

@Injectable()
export class ComplexUtilsService {

  constructor() {
  }

  public add(first: Complex, second: Complex): Complex {
    return math.complex(first.re + second.re, first.im + second.im);
  }

  public multiply(first: Complex, second: Complex): Complex {
    const re = first.re * second.re - first.im * second.im;
    const im = first.re * second.im + first.im * second.re;
    return math.complex(re, im);
  }

  public divide(z1: Complex, z2: Complex): Complex {
    const re = (z1.re * z2.re + z1.im * z2.im) / (math.square(z2.re) + math.square(z2.im));
    const im = (z2.re * z1.im - z1.re * z2.im) / (math.square(z2.re) + math.square(z2.im));
    return math.complex(re, im);
  }

  public sort(type: FunctionType, vector: Complex[]): Complex[] {
    return vector.sort((a: Complex, b: Complex): number => {
      if (Number.parseInt((math.abs(a.re - b.re)).toFixed(0), 10) === 0) {
        if (a.im < b.im) {
          return -1;
        } else if (a.im > b.im) {
          return 1;
        } else {
          return 0;
        }
      } else if (a.re < b.re) {
        return -1;
      } else if (a.re > b.re) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  public sortByModule(type: FunctionType, vector: Complex[]): Complex[] {
    return vector.sort(((a, b) => {
      if ((math.square(a.re) + math.square(a.im)) < (math.square(b.re) + math.square(b.im))) {
        return -1;
      } else if ((math.square(a.re) + math.square(a.im)) > (math.square(b.re) + math.square(b.im))) {
        return 1;
      }
      else {
        return 0;
      }
    }));
  }
}
