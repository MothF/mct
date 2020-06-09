import {Component, OnInit, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {SolutionFinderService} from '../../services/solution-finder.service';
import {BaseChartDirective} from 'ng2-charts';
import {element} from 'protractor';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {

  constructor(private solutionFinderService: SolutionFinderService) {
    solutionFinderService.eventCallback.subscribe(data => {

      if (data) {
        // tslint:disable-next-line:prefer-const
        let x = new Array<any>();
        // tslint:disable-next-line:prefer-const
        let y = new Array<any>();
        data.forEach((elem) => {
          x.push(elem.re);
          y.push(elem.im);
        });
        this.data = [
          {data: y, label: 'Series A'},
        ];
        this.labels = x;
      }
      this.chart.data = this.data;
      this.chart.labels = this.labels;
      this.chart.ngOnChanges({} as SimpleChanges);
    });
  }

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;


  public options = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      line: {
        fill: false
      }
    }
  };


  public labels;
  public legend = true;
  public data;

  ngOnInit(): void {
    this.chart.labels = [];
    this.chart.chartType = 'line';
    this.chart.legend = this.legend;
    this.chart.data = [];
  }
}
