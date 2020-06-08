import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'chart',
    loadChildren: (): any => import('./modules/chart/chart.module').then((module) => module.ChartModule)
  },
  {
    path: 'table',
    loadChildren: (): any => import('./modules/table/table.module').then((module) => module.TableModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
