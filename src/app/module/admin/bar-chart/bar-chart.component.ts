import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartComponent, ChartConfiguration } from 'chart.js';
import { color } from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit ,OnChanges{
  @Input() chartBar:any=[];
  barChartLegend = true;
  barChartPlugins = [];
  barLabel:any=[];
  barData:any=[]


  
  ngOnInit(): void {
   this.chartBar.forEach((item:any) => {
    this.barLabel.push(item.name);
    this.barData.push(item.leaveInWeek)
   });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  
  barChartDataset:ChartConfiguration<'bar'>['data']={
    labels:this.barLabel,
    
    datasets: [
      { data:this.barData ,
      borderColor: '#fff',
      backgroundColor: '#0aade3',
    label:'Weekly leave status',
    
}
    ]
  }; 
 
  batChartOptions:any={
    scaleShowVerticalLines: false,
    responsive:true,
    legend: {
      display: true,
      labels: {
        fontColor: 'red'
      }
     }
  }



  
}
