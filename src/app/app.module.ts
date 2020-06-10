import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule } from './modules/chart/chart.module';
import { TableModule } from './modules/table/table.module';
import { RandomService } from './services/random.service';
import { SolutionFinderService } from './services/solution-finder.service';
import {ComplexUtilsService} from './services/complex.utils.service';


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
  providers: [SolutionFinderService, RandomService, ComplexUtilsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
