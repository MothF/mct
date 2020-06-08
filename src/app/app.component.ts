import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolutionFinderService} from './services/solution-finder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'mct';
  inputDataForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private solutionFinderService: SolutionFinderService) {
  }

  ngOnInit(): void {
    this.inputDataForm = this.formBuilder.group({
      size: ['']
    });
  }

  onSubmit() {
    this.solutionFinderService.provide(this.inputDataForm.value.size);
  }
}
