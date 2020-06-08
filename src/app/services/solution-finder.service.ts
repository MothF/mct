import {Injectable} from '@angular/core';

@Injectable()
export class SolutionFinderService {
  constructor() {
  }

  private size: number;

  public provide(input: number): void {
    this.size = input;
    console.log(this.size);
  }

}
