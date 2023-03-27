import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  @Input() chartDoughnut:any;

  chartLabels=['offline','online']
  chartDataset!:ChartConfiguration<'doughnut'>['data']['datasets'];
  chartOptions:ChartConfiguration<'doughnut'>['options']={
responsive:false

  }

  ngOnInit(): void {
  
     if(this.chartDoughnut){
      let online = this.chartDoughnut.online;
      let offline = this.chartDoughnut.offline;
    this.chartDataset = [{data:[offline,online],label:'seris 1',
    borderColor: '#ebe8e8',
    backgroundColor:['#FF6347','#32CD32'],
    }];

     
  }
    console.log('doughnut :' ,this.chartDoughnut);
    
  }
}
