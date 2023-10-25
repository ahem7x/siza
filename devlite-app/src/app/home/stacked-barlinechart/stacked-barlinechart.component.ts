import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: "app-stacked-barlinechart",
  templateUrl: "./stacked-barlinechart.component.html",
  styleUrls: ["./stacked-barlinechart.component.scss"]
})
export class StackedBarlinechartComponent implements OnInit {
  @Input()
  chartId: string;

  @Input()
  title: string;

  @Input()
  dataSeries1: number[];

  @Input()
  dataSeries2: number[];

  @Input()
  lineSeries: number[];

  @Input()
  labelSeries: string[];

  @Input()
  themeColor: string;

  chart: Chart;

  @ViewChild("myChart") chartView: ElementRef;

  constructor() {}

  createChart() {
    this.chart = new Chart(this.chartView.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: this.labelSeries,
        datasets: [
          {
            type: "horizontalBar",
            label: "Minimum",
            backgroundColor: "#ff572295",
            data: this.dataSeries1,
            order: 1,
          },
          {
            type: "horizontalBar",
            label: "Average",
            backgroundColor: "#33b96d95",
            data: this.lineSeries,
            order: 2,
          },
          {
            type: "horizontalBar",
            label: "Maximum",
            backgroundColor: "#2196f395",
            data: this.dataSeries2,
            order: 3,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          labels: {
            fontFamily: 'Open Sans',
          }
        },
        layout: {
          padding: {
            left: 30,
            right: 30,
            top: 10,
            bottom: 30
          }
        },
        tooltips: {
          titleFontFamily: "Open Sans",
          titleFontSize: 17,
          bodyFontSize: 15,
          bodyFontFamily: "Open Sans"
        },
        scales: {
          xAxes: [
            {
              display: true,
              stacked: true,
              ticks: {
                fontFamily: "Open Sans",
                min: 0,
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              display: true,
              stacked: true,
              ticks: {
                fontFamily: "Open Sans",
                
              },
              gridLines: {
                display: true
              }
            }
          ]
        }
      }
    });
  }

  ngOnInit() {
    this.createChart();
  }
}
