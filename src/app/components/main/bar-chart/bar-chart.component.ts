import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ServicesService } from 'src/app/services.service';
import { State } from '../table/table.component.interface';
import { EventEmitterService } from 'src/app/event-emitter/event-emitter.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = new Array;
  barChartData: ChartDataSets[] = new Array;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartColors: Color[] = [
    { backgroundColor: ['rgb(86, 80, 119)', 'rgb(154, 181, 126)', 'rgb(229, 82, 83)', 'rgb(107, 171, 172)', 'rgb(232, 194, 103)'] }
  ]

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.service.getStates().subscribe((data: State[]) => {

      const groups = _.groupBy(data, "region");
      const result = _.map(groups, function (value, key) {
        return {
          region: key,
          population: _.reduce(value, function (total, o) {
            return total + o.population;
          }, 0)
        };
      });

      this.barChartLabels = _.sortBy(result.map(item => item.region), 'region')
      this.barChartData = [
        {
          data: _.sortBy(result.map(item => item.population), 'region'),
          label: 'População'
        }
      ]
    });
  }

  chartClicked(event: any) {
    let labelChart = event.active.length > 0 ? event.active[0]._view.label : null;
    EventEmitterService.get('clickedChart').emit(labelChart);
  }

  ngOnDestroy() {
    EventEmitterService.get('clickedChart').unsubscribe();
  }

}
