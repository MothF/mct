import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {SolutionFinderService} from '../../services/solution-finder.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent {

  constructor(private solutionFinderService: SolutionFinderService) {
    solutionFinderService.eventCallback.subscribe(data => {
      console.log(data);
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
        this.data = [
          {
            data: initialY,
            label: 'Series A',
            fill: false,
            pointRadius: 1
          },
          {
            data: solvedY,
            label: 'Series B',
            fill: false,
            pointRadius: 1
          }
        ];
        this.labels = initialX;
      }
      this.chart.datasets = this.data;
      this.chart.ngOnChanges({} as SimpleChanges);
    });
  }

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public labels: any[];
  public legend = true;
  public data: any;
}
