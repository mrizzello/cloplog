import { Component, Input } from '@angular/core';
import { DateFormatService } from '../../services/date-format.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-stats-histograms',
  templateUrl: './stats-histograms.component.html',
  styleUrls: ['./stats-histograms.component.scss']
})
export class StatsHistogramsComponent {

  @Input() logs!: any;
  width = 420;
  height = 160;
  margin = ({ top: 20, right: 20, bottom: 20, left: 20 })

  constructor(
    private dateFormat: DateFormatService
  ) { }

  ngAfterViewInit() {
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
    this.createSvg('week');
    this.createSvg('month');
    this.createSvg('year');
  }

  onTabClick(tab: any) {
    switch (tab.index) {
      case 0:
        this.createSvg('week');
        break;
      case 1:
        this.createSvg('month');
        break;
      case 2:
        this.createSvg('year');
        break;
    }
  }

  createSvg(type: string): void {

    d3.select("#chart-" + type + " svg").remove();
    const today = new Date();
    let dateAgo = new Date(today);

    let data = [];
    switch (type) {
      case 'week':
        data = this.logs.slice(0, 7);
        dateAgo.setDate(today.getDate() - 7);
        break;
      case 'month':
        data = this.logs.slice(0, 30);
        dateAgo.setDate(today.getDate() - 30);
        break;
      case 'year':
        data = this.logs.slice(0, 365);
        dateAgo.setDate(today.getDate() - 365);
        break;
    }

    let svg = d3.select("#chart-" + type)
      .append("svg")
      .attr("class", 'svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + this.width + " " + this.height)
      .append("g")
      .attr("transform", "translate(0,0)");

    const domainEnd = this.createDateFromDateString(data[0].date);
    domainEnd.setDate(domainEnd.getDate());
    const domainStart = dateAgo;

    let xScale = d3.scaleTime()
      .domain([domainStart, domainEnd])
      .range([this.margin.left, this.width - this.margin.right])
      .nice();

    const xAxis = d3.axisBottom(xScale)
      .tickSizeOuter(0);

    switch (type) {
      case 'week':
        xAxis.ticks(d3.timeDay.every(1), '%d.%m');
        break;
      case 'month':
        xAxis.ticks(d3.timeMonth.every(1), '%d.%m');
        break;
      case 'year':
        xAxis.ticks(d3.timeMonth.every(2), '%d.%m');
        break;
    }
    
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
      .call(xAxis);

    const { min, max } = data.reduce(
      (result: any, day: any) => ({
        min: Math.min(result.min, day.logs.length),
        max: Math.max(result.max, day.logs.length)
      }),
      { min: 1000, max: 0 }
    );

    let maxY = d3.max(data, (d: any) => { return d.logs.length }) as unknown as number;
    let yScale = d3.scaleLinear()
      .domain([0,maxY])
      .range([this.height - this.margin.bottom, this.margin.top])
      .nice();

    const yAxis = d3.axisLeft(yScale)
      .tickValues(d3.range(0, maxY, 2))
      .tickFormat((y: any) => (y).toFixed());

    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${this.margin.left},0)`)
      .call(yAxis);

    let xRangeValues = xScale.range();
    let xRange = xRangeValues[1] - xRangeValues[0];
    let bandWidth = 0.33 * Math.floor(xRange / data.length);

    svg.append("g")
      .selectAll()
      .data(data)
      .join("rect")
      .attr("x", (d: any) => { return xScale(this.createDateFromDateString(d.date)) - 0.5 * bandWidth; })
      .attr("y", (d: any) => { return yScale(0); })
      .attr("height", (d: any) => { return 0; })
      .attr("width", bandWidth)
      .attr("fill", "#009688");

    svg.append("g")
      .selectAll()
      .data(data)
      .join("rect")
      .attr("x", (d: any) => { return xScale(this.createDateFromDateString(d.date)) - 0.5 * bandWidth; })
      .attr("y", (d: any) => { return yScale(d.logs.length); })
      .attr("height", (d: any) => { return yScale(0) - yScale(d.logs.length); })
      .attr("width", bandWidth)
      .attr("fill", "#009688");

    if( type == 'week' ){
      svg.selectAll("values")
      .data(data)
      .enter().append("text")
      .attr("x", (d: any) => { return xScale(this.createDateFromDateString(d.date)); })
      .attr("y", (d: any) => { return yScale(d.logs.length + 1); })
      .attr("class", 'values')
      .attr("text-anchor", "middle")
      .attr("font-size", "0.75rem")
      .text((d: any) => { return d.logs.length; });
    }

  }

  createDateFromDateString(dateString: string) {
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
}
