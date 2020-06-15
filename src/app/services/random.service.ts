import { Injectable } from '@angular/core';
import * as math from 'mathjs';

@Injectable()
export class RandomService {
  private readonly MAX_RANDOM = 100;
  private readonly MIN_RANDOM = -100;

  public getRandomNumber(): number {
    return Math.ceil(Math.random() * (this.MAX_RANDOM - this.MIN_RANDOM) + this.MIN_RANDOM);
  }

  public getFunctionValues(x: number): number {
    return x*x*x;
  }
}
