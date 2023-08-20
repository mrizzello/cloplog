import { Component, Input } from '@angular/core';
import { DateFormatService } from '../../services/date-format.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-stats-histogram-by-day',
  templateUrl: './stats-histogram-by-day.component.html',
  styleUrls: ['./stats-histogram-by-day.component.scss']
})
export class StatsHistogramByDayComponent {

  @Input() logs!: any;
  svg: any;
  width = 420;
  height = 160;
  margin = ({ top: 20, right: 20, bottom: 20, left: 20 })
  xScale!: d3.ScaleTime<number, number, never>;
  yScale!: d3.ScaleLinear<number, number, never>;

  constructor(
    private dateFormat: DateFormatService
  ) { }

  ngOnInit() {    
    const groupedLogs: any[] = [];
    this.logs.forEach((log: any) => {
      const logDate = this.dateFormat.formatDate(log.timestamp);
      const existingGroup = groupedLogs.find(group => group.date === logDate);      
      if (existingGroup) {
        existingGroup.logs.push(log);
      } else {
        groupedLogs.push({ date: logDate, logs: [log] });
      }
    });
    this.logs = groupedLogs;
    this.createSvg();
  }

  createSvg(): void {
    this.svg = d3.select("#chart")
      .append("svg")
      .attr("class", 'svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + this.width + " " + this.height)
      .append("g")
      .attr("transform", "translate(0,0)");

    const domainEnd = this.createDateFromDateString(this.logs[0].date);
    domainEnd.setDate(domainEnd.getDate());
    const lastDate = this.logs[this.logs.length - 1];
    const domainStart = this.createDateFromDateString(lastDate.date);

    this.xScale = d3.scaleTime()
      .domain([domainStart, domainEnd])
      .range([this.margin.left, this.width - this.margin.right]);

    const xAxis = d3.axisBottom(this.xScale)
      .ticks(d3.timeDay.every(1), '%d.%m')
      .tickSizeOuter(0);

    this.svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
      .call(xAxis);

    const { min, max } = this.logs.reduce(
      (result:any, day:any) => ({
        min: Math.min(result.min, day.logs.length),
        max: Math.max(result.max, day.logs.length)
      }),
      { min: 1000, max: 0 }
    );
    
    this.yScale = d3.scaleLinear()
      .domain([
        0,
        d3.max(this.logs, (d:any) =>{ return d.logs.length }) as unknown as number
      ])
      .range([this.height - this.margin.bottom, this.margin.top]);

    const yAxis = d3.axisLeft(this.yScale)
      .tickFormat((y: any) => (y).toFixed());

    let xRangeValues = this.xScale.range();
    let xRange = xRangeValues[1] - xRangeValues[0];
    let bandWidth = 0.33 * Math.floor(xRange / this.logs.length);

    this.svg.append("g")
      .selectAll()
      .data(this.logs)
      .join("rect")
      .attr("x", (d: any) => { return this.xScale(this.createDateFromDateString(d.date)) - 0.5 * bandWidth; })
      .attr("y", (d: any) => { return this.yScale(0); })
      .attr("height", (d: any) => { return 0; })
      .attr("width", bandWidth)
      .attr("fill", "#009688");

    this.svg.selectAll("rect")
      .transition()
      .duration(200)
      .attr("y", (d: any) => { return this.yScale(d.logs.length); })
      .attr("height", (d: any) => { return this.yScale(0) - this.yScale(d.logs.length); })
      .delay((d: any, i: number) => { return ((this.logs.length - i) * 50); })

    this.svg.selectAll("values")
      .data(this.logs)
      .enter().append("text")
      .attr("x", (d: any) => { return this.xScale(this.createDateFromDateString(d.date)); })
      .attr("y", (d: any) => { return this.yScale(d.logs.length + 1); })
      .attr("class", 'values')
      .attr("text-anchor", "middle")
      .attr("font-size", "0.75rem")
      .attr("opacity", 0)
      .text((d: any) => { return d.logs.length; });

    this.svg.selectAll(".values")
      .transition()
      .duration(1000)
      .attr("opacity", (d: any) => { return 100; })
      .delay((d: any, i: number) => { return ((this.logs.length - i) * 75); })
  }

  createDateFromDateString(dateString: string) {
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
}
