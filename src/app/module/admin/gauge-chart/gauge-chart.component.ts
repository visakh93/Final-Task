import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements OnInit {

  @Input() chartGuage: any;
  gaugemap: any = {};
  constructor() { }
  ngOnInit() {
    this.draw();
  }

  draw() {
    let access = this;
    let gauge = (container: any) => {

      let config = {
        size: 400,
        clipWidth: 400,
        clipHeight: 300,
        ringInset: 20,
        ringWidth: 80,

        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,

        minValue: 0,
        maxValue: 100,
        minAngle: -90,
        maxAngle: 90,

        transitionMs: 4000,

        majorTicks: 10,
        labelInset: 20,
        arcColorFn: d3.interpolateHsl(d3.rgb('#d2cae8'), d3.rgb('#32294a'))
      };
      let range: any;
      let r: any;
      let pointerHeadLength: any;
      let svg;
      let arc: any;
      let scale: any;
      let ticks: any;
      let tickData: any;
      let pointer = undefined;

      let deg2rad = (deg: number) => {
        return deg * Math.PI / 180;
      }
      let configure = () => {
        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale this.gaugemap maps domain values to a percent from 0..1
        scale = d3.scaleLinear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        ticks = scale.ticks(config.majorTicks);
        tickData = d3.range(config.majorTicks)
          .map(() => { return 1 / config.majorTicks; });

        arc = d3.arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle((d: any, i) => {
            let ratio: any = d * i;
            return deg2rad(config.minAngle + (ratio * range));
          })
          .endAngle((d: any, i) => {
            let ratio = d * (i + 1);
            return deg2rad(config.minAngle + (ratio * range));
          });
      }

      let render = (newValue: any) => {
        svg = d3.select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);

        let arcs = svg.append('g')
          .attr('class', 'arc')
          .attr('transform', `translate( ${r},${r})`);

        arcs.selectAll('path')
          .data(tickData)
          .enter().append('path')
          .attr('fill', (d: any, i) => {
            return config.arcColorFn(d * i);
          })
          .attr('d', arc);

        let lg = svg.append('g')
          .attr('class', 'label')
          .attr('transform', `translate( ${r},${r})`);
        lg.selectAll('text')
          .data(ticks)
          .enter().append('text')
          .attr('transform', (d) => {
            let ratio = scale(d);
            let newAngle = config.minAngle + (ratio * range);
            return `rotate( ${newAngle}) translate(0, ${(config.labelInset - r)})`;
          })
          .text((d: any) => { return d });

        let lineData = [[config.pointerWidth / 2, 0],
        [0, -pointerHeadLength],
        [-(config.pointerWidth / 2), 0],
        [0, config.pointerTailLength],
        [config.pointerWidth / 2, 0]];
        let pointerLine: any = d3.line().curve(d3.curveLinear)
        let pg = svg.append('g').data([lineData])
          .attr('class', 'pointer')
          .attr('transform', `translate( ${r},${r})`);

        pointer = pg.append('path')
          .attr('d', pointerLine)
          .attr('transform', 'rotate(' + config.minAngle + ')');
        let ratio = scale(newValue);
        let newAngle = config.minAngle + (ratio * range);
        pointer.transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', `rotate(${newAngle})`);
      }
      access.gaugemap.render = render;
      configure();

      return access.gaugemap;
    };

    let powerGauge = gauge('#gauge');
    powerGauge.render(this.chartGuage);

  }
}


