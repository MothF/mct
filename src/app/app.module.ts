import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChartModule} from './modules/chart/chart.module';
import {TableModule} from './modules/table/table.module';
import {ChartsModule} from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';
import {SolutionFinderService} from './services/solution-finder.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    TableModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [SolutionFinderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
