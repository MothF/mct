import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';



@NgModule({
  exports: [
    TableComponent
  ],
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TableModule { }
