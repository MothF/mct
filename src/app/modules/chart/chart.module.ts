import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartComponent} from './chart.component';
import {RouterModule, Routes} from '@angular/router';
import {ChartsModule} from 'ng2-charts';
import {SolutionFinderService} from '../../services/solution-finder.service';
import {RandomService} from '../../services/random.service';

const routes: Routes = [
  {
    path: '',
    component: ChartComponent
  }
];

@NgModule({
  exports: [
    ChartComponent
  ],
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  providers: [
    SolutionFinderService,
    RandomService
  ]
})
export class ChartModule {
}
