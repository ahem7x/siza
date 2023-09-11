import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  @Input()
  chartId: string;

  @Input()
  title: string;

  @Input()
  dataSeries: number[];

  @Input()
  labelSeries: string[];

  chart: Chart;

  @ViewChild("myChart") chartView: ElementRef;

  constructor() { }

  createChart() {
    this.chart = new Chart(this.chartView.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labelSeries,
        datasets: [{
          data: this.dataSeries,
          backgroundColor: [
            'rgba(51, 185, 109, 0.8)', // green
            'rgba(33, 150, 243, 0.8)', // blue
            'rgba(255, 87, 34, 0.8)', // orange
            'rgba(255, 206, 86, 0.7)', // yellow
            'rgba(153, 102, 255, 0.7)', // purple
            'rgba(55, 71, 79, 0.7)', // teal
          ],
          borderColor: '#FFFFFF',
          hoverBorderColor: '#FFFFFF',
          hoverBorderWidth: 1,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 30,
            right: 30,
            top: 10,
            bottom: 10
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          fullWidth: true,
          labels: {
            fontSize: 11,
            fontFamily: 'Open Sans'
          }
        },
        tooltips: {
          bodyFontFamily: 'Open Sans',
          bodyFontStyle: 'bold'
        }
      }
    });
  }

  ngOnInit() {
    this.createChart()
  }
}
