import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {SolutionFinderService} from '../../services/solution-finder.service';
import {FunctionType} from '../../models/function.type';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public labels: any[];
  public legend = true;
  public data: any;

  public options = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          zeroLineWidth: 2,
          zeroLineColor: '#2C292E',
        },
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          display: true,
          zeroLineWidth: 2,
          zeroLineColor: '#2C292E',
        },
      }],
    }
  };

  constructor(private solutionFinderService: SolutionFinderService) {
    solutionFinderService.eventCallback.subscribe(data => {
      if (data) {
        const initialX = new Array<any>();
        const initialY = new Array<any>();
        const solvedX = new Array<any>();
        const solvedY = new Array<any>();
        data.initial.forEach((elem) => {
          initialX.push(elem.re.toFixed(2));
          initialY.push(elem.im);
        });
        data.solved.forEach((elem) => {
          solvedX.push(elem.re.toFixed(2));
          solvedY.push(elem.im);
        });
        console.log(data.type);
        let chartType: {showLine: boolean, pointRadius: number} = {showLine: false, pointRadius: 1};
        switch (data.type) {
          case FunctionType.Real:
            chartType = {...{showLine: true, pointRadius: 1}};
            break;
          case FunctionType.Complex:
            chartType = {...{showLine: false, pointRadius: 5}};
            break;
        }
        this.data = [
          {
            data: initialY,
            label: 'Initial',
            fill: false,
            borderWidth: 2,
            showLine: chartType.showLine,
            pointRadius: chartType.pointRadius
          },
          {
            data: solvedY,
            label: 'Solution',
            fill: false,
            showLine: chartType.showLine,
            pointRadius: chartType.pointRadius
          }
        ];
        this.labels = initialX;
      }
      this.chart.datasets = this.data;
      this.chart.ngOnChanges({} as SimpleChanges);
    });
  }

}
