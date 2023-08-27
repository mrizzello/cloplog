import { Component, Input } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-stats-day-type',
  templateUrl: './stats-day-type.component.html',
  styleUrls: ['./stats-day-type.component.scss']
})
export class StatsDayTypeComponent {

  @Input() logs!: any;
  width = 420;
  height = 120;
  margin = ({ top: 20, right: 20, bottom: 30, left: 20 })

  ngAfterViewInit() {
    this.logs.sort((a:any, b:any) => a.timestamp - b.timestamp);
    const currentDateTimestamp = Math.floor(Date.now() / 1000);
    const twoWeeksAgoTimestamp = currentDateTimestamp - 10 * 24 * 60 * 60;
    this.logs = this.logs.filter((item:any) => item.timestamp >= twoWeeksAgoTimestamp);
    this.createSvg();
  }

  createSvg(): void {

    let svg = d3.select("figure#day-type")
      .append("svg")
      .attr("class", 'svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + this.width + " " + this.height)
      .append("g")
      .attr("transform", "translate(" + "0" + "," + "0" + ")");

    const times = this.logs.map((item: any) => {
      const date = new Date(item.timestamp * 1000);
      return { hours: date.getHours(), minutes: date.getMinutes() };
    });

    const minTime = d3.min(times, (d: any) => new Date(1970, 0, 1, d.hours, d.minutes - 30)) as Date;
    const maxTime = d3.max(times, (d: any) => new Date(1970, 0, 1, d.hours, d.minutes + 30)) as Date;

    let xScale = d3.scaleTime()
      .domain([minTime, maxTime])
      .range([0, this.width]);

    const xAxis = d3.axisBottom(xScale)
      .ticks(12, "%Hh")
      .tickSizeOuter(0);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (this.height - this.margin.bottom) + ")")
      .call(xAxis);

    const groupedData = d3.groups(this.logs, (item: any) => d3.timeDay.floor(new Date(item.timestamp * 1000)));
    const opacity = d3.scaleLinear()
      .domain([0, groupedData.length - 1])
      .range([1, 0.1]);      
    groupedData.forEach((week: any, index: number) => {
      svg.append("g")
        .selectAll()
        .data(week[1])
        .join("rect")
        .attr("x", (d: any) => { return xScale(this.ts2Hours(d.timestamp)); })
        .attr("y", this.margin.bottom)
        .attr("height", this.height - 2 * this.margin.bottom)
        .attr("width", 1)
        .attr("fill", "#009688")
        .attr("opacity", opacity(index));
    });

  }

  ts2Hours(timestamp: number): Date {
    const hours = new Date(timestamp * 1000).getHours();
    const minutes = new Date(timestamp * 1000).getMinutes();
    const dateRef = new Date(1970, 0, 1, hours, minutes);
    return dateRef;
  }

}
