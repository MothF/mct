import {EventEmitter, Injectable, Output} from '@angular/core';
import {Complex} from 'mathjs';
import {InputType} from '../models/input.type';
import {RandomService} from './random.service';
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

  public setSizeAndSegment(size: number, start: number, end: number): void {
    this.size = size;
    this.start = start;
    this.end = end;
  }

  public setType(value): void {
    this.type = value;
  }

  @Output()
  eventCallback: EventEmitter<any> = new EventEmitter<any>();

  public initVector(): void {
    if (this.f) {
      this.f = new Array<any>();
    }
    switch (this.type) {
      case InputType.Complex:
        for (let i = 0; i <= this.size; i++) {
          this.f.push(math.complex(this.randomService.getRandomNumber(), this.randomService.getRandomNumber()));
        }
        this.eventCallback.emit(this.f);
        break;
      case InputType.Function:
        const step = (this.end - this.start) / this.size;
        let bound = this.start;
        while (bound < this.end) {
          this.f.push(math.complex(bound, this.randomService.getFunctionValues(bound)));
          bound += step;
        }
        this.eventCallback.emit(this.f);
        break;
    }
  }

  public initMatrix(): void {
    let arrayMatrix = new Array<any>();
    for (let j = 0; j <= this.size; j++) {
      for (let k = 0; k <= this.size; k++) {
        Array.of()
      }
    }
  }
}
