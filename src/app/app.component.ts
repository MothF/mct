import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolutionFinderService} from './services/solution-finder.service';
import {FunctionType} from './models/function.type';

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
  private size: number;
  private percent: number;
  private generate = true;
  private changedType = false;


  constructor(private formBuilder: FormBuilder,
              private solutionService: SolutionFinderService) {
  }

  ngOnInit(): void {
    this.inputDataForm = this.formBuilder.group({
      size: ['', Validators.required],
      start: [''],
      end: [''],
      percent: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.changedType) {
      this.generate = true;
    } else {
      if (this.complexSelected && this.size) {
        this.generate = !(this.size === Number.parseInt(this.inputDataForm.value.size, 10));
      } else if (this.functionSelected) {
        this.generate = true;
      }
    }
    this.changedType = false;
    this.size = Number.parseInt(this.inputDataForm.value.size, 10);
    this.percent = Number.parseInt(this.inputDataForm.value.percent, 10);
    this.solutionService.setParams(
      this.size,
      Number.parseInt(this.inputDataForm.value.start, 10),
      Number.parseInt(this.inputDataForm.value.end, 10),
      this.percent
    );
    if (this.complexSelected) {
      this.solutionService.setType(FunctionType.Complex);
    } else {
      this.solutionService.setType(FunctionType.Real);
    }
    if (this.generate) {
      this.solutionService.initVector();
      this.solutionService.initMatrix();
    }
    this.solutionService.solve();
  }

  onRadioClick($event) {
    if ($event.target.id === 'complex') {
      this.complexSelected = true;
      this.functionSelected = false;
    } else {
      this.functionSelected = true;
      this.complexSelected = false;
    }
    this.changedType = true;
  }
}
