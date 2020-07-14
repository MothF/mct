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
  public dataset: any;

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
        const solvedY = new Set<any>();
        data.initial.forEach((elem) => {
          initialX.push(Number.parseFloat(elem.re.toFixed(2)));
          initialY.push(elem.im);
        });
        data.solved.forEach((elem) => {
          solvedX.push(Number.parseFloat(elem.re.toFixed(2)));
          solvedY.add(elem.im);
        });
        const updatedSolvedY = this.checker(initialX, initialY, solvedX, solvedY, data.type);
        let chartType: { showLine: boolean, pointRadius: number } = {showLine: false, pointRadius: 1};
        switch (data.type) {
          case FunctionType.Real:
            chartType = {...{showLine: true, pointRadius: 1}};
            break;
          case FunctionType.Complex:
            chartType = {...{showLine: false, pointRadius: 5}};
            break;
        }
        let solutionPointsRadius = chartType.pointRadius;
        if (solvedY.size === 1) {
          solutionPointsRadius = 7;
        }
        this.dataset = [
          {
            data: initialY,
            label: 'Initial',
            fill: false,
            borderWidth: 2,
            showLine: chartType.showLine,
            pointRadius: chartType.pointRadius,
          },
          {
            data: updatedSolvedY,
            label: 'Solution',
            fill: false,
            showLine: chartType.showLine,
            pointRadius: solutionPointsRadius
          }
        ];
        this.labels = initialX;
      }
      this.chart.datasets = this.dataset;
      this.chart.ngOnChanges({} as SimpleChanges);
    });
  }

  private checker(initialX: Array<any>, initialY: Array<any>, solvedX: Array<any>, solvedY: Set<any>, dataType: any): Array<any> {
    const updatedSolvedY = new Array<any>();
    if (solvedY.size === 1 && dataType === FunctionType.Complex) {
      if (!initialX.includes(0)) {
        initialX.push(0);
        initialX.sort((a, b) => {
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      const zeroPosition = initialX.indexOf(0);
      initialY.splice(zeroPosition, 0, null);
      initialY.forEach((elem) => {
        if (elem !== null) {
          updatedSolvedY.push(null);
        } else {
          updatedSolvedY.push(0);
        }
      });
      return updatedSolvedY;
    } else if (solvedY.size === 1 && dataType === FunctionType.Real){
      initialY.forEach(() => {
        updatedSolvedY.push(0);
      });
      return updatedSolvedY;
    } else {
      return Array.from(solvedY);
    }
  }
}
