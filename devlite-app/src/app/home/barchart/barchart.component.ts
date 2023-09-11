import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-barchart",
  templateUrl: "./barchart.component.html",
  styleUrls: ["./barchart.component.scss"]
})
export class BarchartComponent implements OnInit {

  @Input()
  chartId: string;

  @Input()
  title: string;

  @Input()
  dataSeries: number[];

  @Input()
  labelSeries: string[];

  @Input()
  themeColor: string;

  chart: Chart;

  @ViewChild("myChart") chartView: ElementRef;

  constructor() { }

  createChart() {
    this.chart = new Chart(this.chartView.nativeElement, {
      type: "bar",
      data: {
        labels: this.labelSeries,
        datasets: [
          {
            data: this.dataSeries,
            backgroundColor: this.themeColor,
            //barThickness: 5,
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            fontFamily: 'Open Sans'
          }
        },
        layout: {
          padding: {
            left: 30,
            right: 30,
            top: 10,
            bottom: 50
          }
        },
        tooltips: {
          titleFontFamily: 'Open Sans',
          titleFontSize: 17,
          bodyFontSize: 15,
          bodyFontFamily: 'Open Sans',
        },
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                fontFamily: 'Open Sans'
              },
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                fontFamily: 'Open Sans'
              },
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
