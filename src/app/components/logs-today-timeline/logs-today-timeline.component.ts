import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { UpdateDisplayService } from '../../services/update-display.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-logs-today-timeline',
  templateUrl: './logs-today-timeline.component.html',
  styleUrls: ['./logs-today-timeline.component.scss']
})
export class LogsTodayTimelineComponent implements OnInit {

  logs: any[] = [];
  svg: any;
  width = 420;
  height = 30;
  yScale = 0.35;
  startOfDayUTS!: number;
  endOfDayUTS!: number;
  xScale!: d3.ScaleLinear<number, number, never>;

  constructor(
    private dataStore: DatastoreService,
    private udService: UpdateDisplayService
  ) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    this.startOfDayUTS = Math.floor(startOfDay.getTime() / 1000);
    this.endOfDayUTS = Math.floor(endOfDay.getTime() / 1000);
  }

  ngOnInit(): void {
    this.createSvg();
    this.fetchLogs();
    this.udService.updateDisplay$.subscribe(() => {
      this.fetchLogs();
    });
  }

  fetchLogs() {
    this.dataStore.getTodayLogs().then((logs: any) => {
      this.logs = logs;
      this.drawTimeline(this.logs);
    });
  }

  createSvg(): void {
    this.svg = d3.select("figure#timeline")
      .append("svg")
      .attr("class", 'svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + this.width + " " + this.height)
      .append("g")
      .attr("transform", "translate(" + "0" + "," + "0" + ")");

    this.xScale = d3.scaleLinear()
      .domain([-0.3, 24.3])
      .range([0, this.width]);

    const xAxis = d3.axisBottom(this.xScale)
      .ticks(12)
      .tickSizeOuter(0);

    this.svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (this.height * this.yScale) + ")")
      .call(xAxis);

  }

  drawTimeline(data: any[]): void {

    this.svg.selectAll(".symbol").remove();

    this.svg.selectAll(".symbol")
      .data(data)
      .enter()
      .append("path")
      .attr("class","symbol")
      .attr("transform", (d: any) => "translate("
        + this.xScale(this.ts2Hours(d.timestamp)) + ","
        + (this.height * this.yScale) + ")")
      .attr("d", d3.symbol().type(d3.symbolCircle).size(67))
      .style("fill", "#ffffff")
      .style("stroke-width", "2.5")
      .style("stroke", "#009688");

  }

  ts2Hours(timestamp: number): number {
    return parseFloat(((timestamp - this.startOfDayUTS) * 24 / (this.endOfDayUTS - this.startOfDayUTS)).toFixed(1));
  }
}
