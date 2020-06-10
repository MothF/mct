import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolutionFinderService} from './services/solution-finder.service';
import {InputType} from './models/input.type';
import {ChartComponent} from './modules/chart/chart.component';

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
      size: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      percent: ['', Validators.required]
    });
  }

  onSubmit() {
    this.solutionService.setParams(
      Number.parseInt(this.inputDataForm.value.size, 10),
      Number.parseInt(this.inputDataForm.value.start, 10),
      Number.parseInt(this.inputDataForm.value.end, 10),
      Number.parseInt(this.inputDataForm.value.percent, 10)
    );
    if (this.complexSelected) {
      this.solutionService.setType(InputType.Complex);
    } else {
      this.solutionService.setType(InputType.Function);
    }
    this.solutionService.initVector();
    this.solutionService.initMatrix();
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
  }
}
