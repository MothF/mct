import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SolutionFinderService} from './services/solution-finder.service';
import {InputType} from './models/input.type';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'mct';
  inputDataForm: FormGroup;
  complexSelected = false;
  functionSelected = false;


  constructor(private formBuilder: FormBuilder,
              private solutionService: SolutionFinderService) {
  }

  ngOnInit(): void {
    this.inputDataForm = this.formBuilder.group({
      size: [''],
      start: [''],
      end: ['']
    });
  }

  onSubmit() {
    this.solutionService.setSizeAndSegment(
      Number.parseInt(this.inputDataForm.value.size, 10),
      Number.parseInt(this.inputDataForm.value.start, 10),
      Number.parseInt(this.inputDataForm.value.end, 10)
    );
    if (this.complexSelected) {
      this.solutionService.setType(InputType.Complex);
    } else {
      this.solutionService.setType(InputType.Function);
    }
    this.solutionService.initVector();
  }

  onComplexClick() {
    this.complexSelected = true;
    this.functionSelected = false;
  }

  onFunctionClick() {
    this.functionSelected = true;
    this.complexSelected = false;
  }
}
